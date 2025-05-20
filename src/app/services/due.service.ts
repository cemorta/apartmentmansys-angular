import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Due } from '../models/due.model';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class DueService {

  constructor(private http: HttpClient) { }

  /**
   * Get all dues for a specific apartment
   */
  getDuesByApartmentId(apartmentId: number): Observable<Due[]> {
    return this.http.get<Due[]>(`${environment.apiUrl}/api/dues/apartment/${apartmentId}`);
  }

  /**
   * Create a new due for an apartment
   */
  createDue(apartmentId: number, cost: number, period: string): Observable<Due> {
    return this.http.post<Due>(`${environment.apiUrl}/api/dues`, {
      apartmentId,
      cost,
      period
    });
  }

  /**
   * Get all dues for a specific flat
   */
  getDuesByFlatId(flatId: number): Observable<Due[]> {
    return this.http.get<Due[]>(`${environment.apiUrl}/api/dues/flat/${flatId}`);
  }

  /**
   * Get a specific due by ID
   */
  getDueById(dueId: number): Observable<Due> {
    return this.http.get<Due>(`${environment.apiUrl}/api/dues/${dueId}`);
  }
}
