import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MaintenanceRequestAssignmentModel } from '../../models/maintenance-request-assignment.model';
import { MaintenanceRequestAssignmentService } from '../../services/maintenance-request-assignment.service';

@Component({
  selector: 'app-staff-maintenance-assignments',
  standalone: false,
  templateUrl: './staff-maintenance-assignments.component.html',
  styleUrl: './staff-maintenance-assignments.component.css'
})
export class StaffMaintenanceAssignmentsComponent implements OnInit {
  assignments: MaintenanceRequestAssignmentModel[] = [];
  filterForm: FormGroup;
  notesForm: FormGroup;
  selectedAssignment: MaintenanceRequestAssignmentModel | null = null;

  // Options for filters
  categoryOptions = ['All', 'PLUMBING', 'ELECTRICAL', 'HVAC', 'APPLIANCE', 'GENERAL'];
  statusOptions = ['All', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];

  // Sorting options
  sortOptions = [
    { value: 'assignedAt', label: 'Assigned Date' },
    { value: 'maintenanceRequest.priority', label: 'Priority' },
    { value: 'maintenanceRequest.createdAt', label: 'Request Date' },
    { value: 'maintenanceRequest.status', label: 'Status' }
  ];

  // Pagination
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pageSize = 10;

  // UI state
  loading = false;
  showNotesModal = false;
  processingAction = false;

  constructor(
    private staffAssignmentsService: MaintenanceRequestAssignmentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.filterForm = this.formBuilder.group({
      search: [''],
      category: ['All'],
      status: ['All'],
      sortBy: ['assignedAt'],
      sortDir: ['desc']
    });

    this.notesForm = this.formBuilder.group({
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadAssignments();

    // Subscribe to form value changes to apply filters automatically
    this.filterForm.valueChanges.subscribe(() => {
      this.currentPage = 0; // Reset to first page when filters change
      this.loadAssignments();
    });
  }

  loadAssignments(): void {
    this.loading = true;
    const filters = {
      search: this.filterForm.get('search')?.value,
      category: this.filterForm.get('category')?.value !== 'All' ? this.filterForm.get('category')?.value : null,
      status: this.filterForm.get('status')?.value !== 'All' ? this.filterForm.get('status')?.value : null,
      sortBy: this.filterForm.get('sortBy')?.value,
      sortDir: this.filterForm.get('sortDir')?.value,
      page: this.currentPage,
      size: this.pageSize
    };

    this.staffAssignmentsService.getMyAssignments(filters).subscribe({
      next: (response) => {
        this.assignments = response.content;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading assignments', error);
        this.loading = false;
      }
    });
  }

  clearFilters(): void {
    this.filterForm.patchValue({
      search: '',
      category: 'All',
      status: 'All',
      sortBy: 'assignedAt',
      sortDir: 'desc'
    });
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadAssignments();
    }
  }

  viewRequestDetails(requestId: number): void {
    this.router.navigate(['/maintenance-requests', requestId]);
  }

  startWork(assignment: MaintenanceRequestAssignmentModel, event: Event): void {
    event.stopPropagation();
    this.processingAction = true;

    this.staffAssignmentsService.startWork(assignment.id).subscribe({
      next: () => {
        this.loadAssignments();
        this.processingAction = false;
      },
      error: (error) => {
        console.error('Error starting work', error);
        this.processingAction = false;
      }
    });
  }

  openCompleteModal(assignment: MaintenanceRequestAssignmentModel, event: Event): void {
    event.stopPropagation();
    this.selectedAssignment = assignment;
    this.notesForm.patchValue({ notes: assignment.notes || '' });
    this.showNotesModal = true;
  }

  completeWork(): void {
    if (!this.selectedAssignment) return;

    this.processingAction = true;
    const notes = this.notesForm.get('notes')?.value;

    this.staffAssignmentsService.completeWork(this.selectedAssignment.id, notes).subscribe({
      next: () => {
        this.showNotesModal = false;
        this.loadAssignments();
        this.processingAction = false;
        this.selectedAssignment = null;
        this.notesForm.reset();
      },
      error: (error) => {
        console.error('Error completing work', error);
        this.processingAction = false;
      }
    });
  }

  openNotesModal(assignment: MaintenanceRequestAssignmentModel, event: Event): void {
    event.stopPropagation();
    this.selectedAssignment = assignment;
    this.notesForm.patchValue({ notes: assignment.notes || '' });
    this.showNotesModal = true;
  }

  updateNotes(): void {
    if (!this.selectedAssignment) return;

    this.processingAction = true;
    const notes = this.notesForm.get('notes')?.value;

    this.staffAssignmentsService.updateNotes(this.selectedAssignment.id, notes).subscribe({
      next: (updatedAssignment) => {
        // Find and update the assignment in the list
        const index = this.assignments.findIndex(a => a.id === updatedAssignment.id);
        if (index !== -1) {
          this.assignments[index] = updatedAssignment;
        }
        this.showNotesModal = false;
        this.processingAction = false;
        this.selectedAssignment = null;
        this.notesForm.reset();
      },
      error: (error) => {
        console.error('Error updating notes', error);
        this.processingAction = false;
      }
    });
  }

  closeModal(): void {
    this.showNotesModal = false;
    this.selectedAssignment = null;
    this.notesForm.reset();
  }

  getCategoryClass(category?: string): string {
    if (!category) return 'badge bg-secondary';

    const categoryMap: Record<string, string> = {
      'PLUMBING': 'text-primary',
      'ELECTRICAL': 'text-danger',
      'HVAC': 'text-success',
      'APPLIANCE': 'text-warning',
      'GENERAL': 'text-secondary'
    };
    return categoryMap[category] || '';
  }

  getPriorityClass(priority?: string): string {
    if (!priority) return 'badge bg-secondary';

    const priorityMap: Record<string, string> = {
      'LOW': 'badge bg-success',
      'MEDIUM': 'badge bg-warning',
      'HIGH': 'badge bg-danger'
    };
    return priorityMap[priority] || '';
  }

  getStatusClass(status?: string): string {
    if (!status) return 'badge bg-secondary';

    const statusMap: Record<string, string> = {
      'PENDING': 'badge bg-secondary',
      'IN_PROGRESS': 'badge bg-primary',
      'COMPLETED': 'badge bg-success',
      'CANCELED': 'badge bg-danger'
    };
    return statusMap[status] || '';
  }

  getStatusText(status?: string): string {
    if (!status) return 'Unknown';
    return status.replace('_', ' ');
  }

  // Track freshness of assignments
  isRecentlyAssigned(assignedAt?: string): boolean {
    if (!assignedAt) return false;

    const assignedDate = new Date(assignedAt);
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - (2 * 60 * 60 * 1000)); // 2 hours ago
    return assignedDate > twoHoursAgo;
  }
}
