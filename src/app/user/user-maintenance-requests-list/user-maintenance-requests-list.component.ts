import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { MaintenanceRequest } from '../../models/maintenance-request.model';
import { EnumDisplayService } from '../../services/enum-display.service';

@Component({
  selector: 'user-maintenance-requests-list',
  standalone: false,
  templateUrl: './user-maintenance-requests-list.component.html',
  styleUrl: './user-maintenance-requests-list.component.css'
})
export class UserMaintenanceRequestsListComponent implements OnInit {
  maintenanceRequests: MaintenanceRequest[] = [];
  filterForm: FormGroup;
  userId = JSON.parse(localStorage.getItem("currentUser") || '{}')?.id;
    // Options for filters - these must match the exact enum constant names in Java
  categoryOptions = ['All', 'PLUMBING', 'ELECTRICAL', 'HVAC', 'APPLIANCE', 'GENERAL'];
  priorityOptions = ['All', 'LOW', 'MEDIUM', 'HIGH'];
  statusOptions = ['All', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];
  
    // Pagination
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pageSize = 10;
  
  constructor(
    private maintenanceRequestService: MaintenanceRequestService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected enumDisplayService: EnumDisplayService
  ) {
    this.filterForm = this.formBuilder.group({
      search: [''],
      category: ['All'],
      priority: ['All'],
      status: ['All']
    });
  }

  ngOnInit(): void {
    this.loadMaintenanceRequests();

    // Subscribe to form value changes to apply filters automatically
    this.filterForm.valueChanges.subscribe(() => {
    this.currentPage = 0; // Reset to first page when filters change
    this.loadMaintenanceRequests();
    });
  }

  loadMaintenanceRequests(): void {
    const filters = {
    search: this.filterForm.get('search')?.value,
    category: this.filterForm.get('category')?.value !== 'All' ? this.filterForm.get('category')?.value : null,
    priority: this.filterForm.get('priority')?.value !== 'All' ? this.filterForm.get('priority')?.value : null,
    status: this.filterForm.get('status')?.value !== 'All' ? this.filterForm.get('status')?.value : null,
    page: this.currentPage,
    size: this.pageSize
    };

    this.maintenanceRequestService.getResidentMaintenanceRequestById(this.userId).subscribe(response => {
      this.maintenanceRequests = response;
      this.totalItems = response.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    });

  }

  clearFilters(): void {
    this.filterForm.patchValue({
      search: '',
      category: 'All',
      priority: 'All',
      status: 'All'
    });
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadMaintenanceRequests();
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/user/my-maintenance-requests', id]);
  }

  deleteRequest(id: number): void {
    if (confirm('Are you sure you want to delete this maintenance request?')) {
      this.maintenanceRequestService.deleteMaintenanceRequest(id).subscribe(() => {
        this.loadMaintenanceRequests();
      });
    }
  }

  getCategoryClass(category: string): string {
    const categoryMap: Record<string, string> = {
      'PLUMBING': 'text-primary',
      'ELECTRICAL': 'text-danger',
      'HVAC': 'text-success',
      'APPLIANCE': 'text-warning',
      'GENERAL': 'text-secondary'
    };
    return categoryMap[category] || '';
  }

  getPriorityClass(priority: string): string {
    const priorityMap: Record<string, string> = {
      'LOW': 'badge bg-success',
      'MEDIUM': 'badge bg-warning',
      'HIGH': 'badge bg-danger'
    };
    return priorityMap[priority] || '';
  }

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'PENDING': 'badge bg-secondary',
      'IN_PROGRESS': 'badge bg-primary',
      'COMPLETED': 'badge bg-success',
      'CANCELED': 'badge bg-danger'
    };
    return statusMap[status] || '';
  }
  
}
