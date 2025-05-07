import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8081/api';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(user);
        })
      );
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/admin-login`, { email, password })
      .pipe(
        tap(user => {
          if (user.adminProfile) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', user.token);
            this.currentUserSubject.next(user);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.adminProfile;
  }

  isResident(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.residentProfile;
  }

  isFlatOwner(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.flatOwnerProfile;
  }

  isStaff(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.staffProfile;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
