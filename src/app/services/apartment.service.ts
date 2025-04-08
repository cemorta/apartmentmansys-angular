import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apiUrl = 'http://localhost:8081/api/apartments';
  private apiFlatUrl = 'http://localhost:8081/api/flats';
  constructor(private http: HttpClient) {}

  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apiUrl);
  }

  getApartmentById(id: number): Observable<Apartment> {
    return this.http.get<Apartment>(`${this.apiUrl}/${id}`);
  }

  createApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(`${this.apiUrl}/create`, apartment);
  }

  deleteApartment(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteFlat(flatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiFlatUrl}/${flatId}`);
  }
}
