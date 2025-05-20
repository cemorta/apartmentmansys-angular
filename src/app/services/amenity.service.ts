import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amenity } from '../models/amenity.model'
import { AmenitySlot } from '../models/amenity-slot.model'
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  constructor(private http: HttpClient) {}

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${environment.apiUrl}/api/amenities`);
  }

  getAmenity(id: number): Observable<Amenity> {
    return this.http.get<Amenity>(`${environment.apiUrl}/api/amenities/${id}`);
  }

  createAmenity(amenity: Omit<Amenity, 'id'>): Observable<Amenity> {
    return this.http.post<Amenity>(`${environment.apiUrl}/api/amenities`, amenity);
  }

  getAvailableSlots(amenityId: number, date: string): Observable<AmenitySlot[]> {
    return this.http.get<AmenitySlot[]>(`${environment.apiUrl}/api/amenities/${amenityId}/slots`, {
      params: { date }
    });
  }

  reserveSlot(amenityId: number, payload: { date: string, startTime: string, userId: number }) {
    return this.http.post(`${environment.apiUrl}/api/amenities/${amenityId}/reserve`, payload);
  }
}
