import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { MaintenanceRequest } from '../../models/maintenance-request.model';

@Component({
  selector: 'app-admin-maintenance-request-detail',
  standalone: false,
  templateUrl: './admin-maintenance-request-detail.component.html',
  styleUrl: './admin-maintenance-request-detail.component.css'
})
export class AdminMaintenanceRequestDetailComponent implements OnInit {
  request: MaintenanceRequest | null = null;
  loading = true;
  error = false;
  statusForm: FormGroup;
  assignForm: FormGroup;

  statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private maintenanceRequestService: MaintenanceRequestService,
    private fb: FormBuilder
  ) {
    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    });

    this.assignForm = this.fb.group({
      staffUserId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRequest(+id);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  loadRequest(id: number): void {
    this.maintenanceRequestService.getMaintenanceRequestById(id).subscribe({
      next: (data:any) => {
        this.request = data;
        this.statusForm.patchValue({ status: data.status });
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  updateStatus(): void {
    if (this.statusForm.invalid || !this.request) {
      return;
    }

    const status = this.statusForm.get('status')?.value;

    this.maintenanceRequestService.updateStatus(this.request.id, status).subscribe({
      next: (updatedRequest:any) => {
        this.request = updatedRequest;
      }
    });
  }

  // assignStaff(): void {
  //   if (this.assignForm.invalid || !this.request) {
  //     return;
  //   }
  //
  //   const staffUserId = this.assignForm.get('staffUserId')?.value;
  //
  //   this.maintenanceRequestService.assignRequest(this.request.id, staffUserId).subscribe({
  //     next: (updatedRequest) => {
  //       this.request = updatedRequest;
  //       this.assignForm.reset();
  //     }
  //   });
  // }

  navigateToEdit(): void {
    if (this.request) {
      this.router.navigate(['/admin/maintenance/edit', this.request.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/maintenance']);
  }

  getCategoryClass(category: string | undefined): string {
    if (!category) return '';

    const categoryMap: Record<string, string> = {
      'PLUMBING': 'text-primary',
      'ELECTRICAL': 'text-danger',
      'HVAC': 'text-success',
      'APPLIANCE': 'text-warning',
      'GENERAL': 'text-secondary'
    };
    return categoryMap[category] || '';
  }

  getPriorityClass(priority: string | undefined): string {
    if (!priority) return '';

    const priorityMap: Record<string, string> = {
      'LOW': 'badge bg-success',
      'MEDIUM': 'badge bg-warning',
      'HIGH': 'badge bg-danger'
    };
    return priorityMap[priority] || '';
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return '';

    const statusMap: Record<string, string> = {
      'PENDING': 'badge bg-secondary',
      'IN_PROGRESS': 'badge bg-primary',
      'COMPLETED': 'badge bg-success',
      'CANCELED': 'badge bg-danger'
    };
    return statusMap[status] || '';
  }

  getStatusText(status: string | undefined): string {
    if (!status) return '';
    return status.replace('_', ' ');
  }
}
