import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Flat} from '../models/flat.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private apiUrl = 'http://localhost:8081/api/flats';

  constructor(private http: HttpClient) {}

  createFlat(flat: Flat): Observable<Flat> {
    return this.http.post<Flat>(`${this.apiUrl}/create`, flat);
  }

  
}
