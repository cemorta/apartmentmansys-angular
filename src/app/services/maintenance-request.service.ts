import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { MaintenanceRequest } from '../models/maintenance-request.model';

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {
  private apiUrl = `${environment.apiUrl}/api/maintenance`;

  constructor(private http: HttpClient) { }

  getMaintenanceRequests(filters: any): Observable<PageResponse<MaintenanceRequest>> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('size', filters.size.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }

    if (filters.category) {
      // Make sure we use the exact enum constant name, not the display value
      params = params.set('category', filters.category);
    }

    if (filters.priority) {
      // Make sure we use the exact enum constant name, not the display value
      params = params.set('priority', filters.priority);
    }

    if (filters.status) {
      // Make sure we use the exact enum constant name, not the display value
      params = params.set('status', filters.status);
    }

    return this.http.get<PageResponse<MaintenanceRequest>>(this.apiUrl, { params });
  }

  getMaintenanceRequestById(id: number): Observable<MaintenanceRequest> {
    return this.http.get<MaintenanceRequest>(`${this.apiUrl}/${id}`);
  }

  createMaintenanceRequest(request: Partial<MaintenanceRequest>): Observable<MaintenanceRequest> {
    return this.http.post<MaintenanceRequest>(this.apiUrl, request);
  }

  updateMaintenanceRequest(id: number, request: Partial<MaintenanceRequest>): Observable<MaintenanceRequest> {
    return this.http.put<MaintenanceRequest>(`${this.apiUrl}/${id}`, request);
  }

  deleteMaintenanceRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Additional methods for specific actions like changing status
  updateStatus(id: number, status: string): Observable<MaintenanceRequest> {
    return this.http.patch<MaintenanceRequest>(`${this.apiUrl}/${id}/status`, { status });
  }

  assignRequest(id: number, staffUserId: number): Observable<MaintenanceRequest> {
    return this.http.post<MaintenanceRequest>(`${this.apiUrl}/${id}/assignments`, { staffUserId });
  }
}
