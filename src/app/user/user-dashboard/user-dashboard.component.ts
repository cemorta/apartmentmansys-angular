import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { MaintenanceRequest } from '../../models/maintenance-request.model';



@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  recentRequests: MaintenanceRequest[] = [];
  totalRequests = 0;
  openRequests = 0;
  completedRequests = 0;
  inProgressRequests = 0;
  loading = true;
  error = false;
  charts: any = {};
  residentId = 1; // This would come from an auth service in a real app
  statusCounts: any = {};
  categoryCounts: any = {};
  monthlyRequestCounts: any = [];

  constructor(private http: HttpClient, private requestService: MaintenanceRequestService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
   let userId;
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      userId =  user.id;
    }
    if (userId) {
    this.loading = true;
    this.requestService.getResidentMaintenanceRequestById(userId).pipe(
      catchError(err => {
        console.error('Veri alınırken hata:', err);
        this.error = true;
        return of([]);
      }),
      finalize(() => this.loading = false)
    ).subscribe((requests: MaintenanceRequest[]) => {
      this.recentRequests = requests.slice(0, 5);
      this.totalRequests = requests.length;
      this.processRequestStats(requests);
      this.initCharts();
    });
  } else {
    console.error('Kullanıcı ID’si bulunamadı!');
    this.error = true;
  }
  }

  processRequestStats(requests: MaintenanceRequest[]): void {
    // Count by status
    this.statusCounts = {
      'PENDING': 0,
      'IN_PROGRESS': 0,
      'COMPLETED': 0,
      'CANCELLED': 0
    };
    
    // Count by category
    this.categoryCounts = {};
    
    // Process monthly data
    const monthlyCounts = new Map<string, number>();
    
    for (const request of requests) {
      // Status counts
      if (this.statusCounts[request.status] !== undefined) {
        this.statusCounts[request.status]++;
      } else {
        this.statusCounts[request.status] = 1;
      }
      
      // Simple counters
      if (request.status === 'PENDING') this.openRequests++;
      if (request.status === 'IN_PROGRESS') this.inProgressRequests++;
      if (request.status === 'COMPLETED') this.completedRequests++;
      
      // Category counts
      if (this.categoryCounts[request.category] !== undefined) {
        this.categoryCounts[request.category]++;
      } else {
        this.categoryCounts[request.category] = 1;
      }
      
      // Monthly counts
      const month = new Date(request.createdAt).toLocaleString('default', { month: 'short' });
      monthlyCounts.set(month, (monthlyCounts.get(month) || 0) + 1);
    }
    
    // Prepare data for monthly chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.monthlyRequestCounts = months.map(month => ({
      month,
      count: monthlyCounts.get(month) || 0
    }));
  }

  initCharts(): void {
    setTimeout(() => {
      this.createStatusChart();
      this.createCategoryChart();
      this.createMonthlyChart();
    }, 0);
  }

  createStatusChart(): void {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (!ctx) return;

    const labels = Object.keys(this.statusCounts);
    const data = Object.values(this.statusCounts);
    
    this.charts.statusChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#ff6384', // Open
            '#36a2eb', // In Progress
            '#4bc0c0', // Completed
            '#9966ff'  // Cancelled
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Request Status'
          }
        }
      }
    });
  }

  createCategoryChart(): void {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const labels = Object.keys(this.categoryCounts);
    const data = Object.values(this.categoryCounts);
    
    this.charts.categoryChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Requests',
          data: data,
          backgroundColor: '#36a2eb',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Requests by Category'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  createMonthlyChart(): void {
    const ctx = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    this.charts.monthlyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.monthlyRequestCounts.map((item: any) => item.month),
        datasets: [{
          label: 'Requests',
          data: this.monthlyRequestCounts.map((item: any) => item.count),
          borderColor: '#ff6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Request Trend'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'status-open';
      case 'IN_PROGRESS': return 'status-progress';
      case 'COMPLETED': return 'status-completed';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  }

  refreshData(): void {
    // Destroy existing charts
    Object.values(this.charts).forEach((chart: any) => {
      if (chart) chart.destroy();
    });
    this.charts = {};
    
    // Reset counters
    this.openRequests = 0;
    this.inProgressRequests = 0;
    this.completedRequests = 0;
    
    // Fetch new data
    this.fetchDashboardData();
  }
}
