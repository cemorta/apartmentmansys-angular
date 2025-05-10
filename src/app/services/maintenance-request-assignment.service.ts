import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { MaintenanceRequestAssignmentModel } from '../models/maintenance-request-assignment.model';
import { AuthService } from './auth.service';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestAssignmentService {
  private apiUrl = `${environment.apiUrl}/api/maintenance`;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  /**
   * Get all maintenance requests assigned to the currently logged-in staff member
   */
  getMyAssignments(filters: any): Observable<Page<MaintenanceRequestAssignmentModel>> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('size', filters.size.toString());

    if (filters.status) {
      params = params.set('status', filters.status);
    }

    if (filters.category) {
      params = params.set('category', filters.category);
    }

    if (filters.search) {
      params = params.set('search', filters.search);
    }

    if (filters.sortBy) {
      params = params.set('sort', `${filters.sortBy},${filters.sortDir || 'asc'}`);
    }

    return this.http.get<Page<MaintenanceRequestAssignmentModel>>(`${this.apiUrl}/by-staff/${this.authService.getCurrentUser().id}`, { params });
  }

  /**
   * Mark a maintenance request as in progress
   */
  startWork(assignmentId: number): Observable<MaintenanceRequestAssignmentModel> {
    return this.http.post<MaintenanceRequestAssignmentModel>(`${this.apiUrl}/${assignmentId}/start`, {});
  }

  /**
   * Mark a maintenance request as completed
   */
  completeWork(assignmentId: number, notes?: string): Observable<MaintenanceRequestAssignmentModel> {
    return this.http.post<MaintenanceRequestAssignmentModel>(`${this.apiUrl}/${assignmentId}/complete`, { notes });
  }

  /**
   * Add notes to an assignment
   */
  updateNotes(assignmentId: number, notes: string): Observable<MaintenanceRequestAssignmentModel> {
    return this.http.patch<MaintenanceRequestAssignmentModel>(`${this.apiUrl}/${assignmentId}/notes`, { notes });
  }
}
