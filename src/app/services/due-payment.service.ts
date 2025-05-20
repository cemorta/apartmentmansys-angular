import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DuePayment } from '../models/due-payment.model';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class DuePaymentService {

  constructor(private http: HttpClient) { }

  /**
   * Mark a due payment as complete
   */
  markPaymentComplete(duePaymentId: number): Observable<DuePayment> {
    return this.http.put<DuePayment>(`${environment.apiUrl}/api/due-payments/${duePaymentId}/complete`, {});
  }

  /**
   * Get all due payments for a user
   */
  getDuePaymentsByUserId(userId: number): Observable<DuePayment[]> {
    return this.http.get<DuePayment[]>(`${environment.apiUrl}/api/due-payments/user/${userId}`);
  }

  /**
   * Get all due payments for a specific flat
   */
  getDuePaymentsByFlatId(flatId: number): Observable<DuePayment[]> {
    return this.http.get<DuePayment[]>(`${environment.apiUrl}/api/due-payments/flat/${flatId}`);
  }

  /**
   * Get a specific due payment by ID
   */
  getDuePaymentById(duePaymentId: number): Observable<DuePayment> {
    return this.http.get<DuePayment>(`${environment.apiUrl}/api/due-payments/${duePaymentId}`);
  }

  /**
   * Get all due payments for a specific due
   */
  getDuePaymentsByDueId(dueId: number): Observable<DuePayment[]> {
    return this.http.get<DuePayment[]>(`${environment.apiUrl}/api/due-payments/due/${dueId}`);
  }
}
