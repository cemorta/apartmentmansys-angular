// select-login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-select-login',
  standalone: false,
  templateUrl: './select-login.component.html',
  styleUrl: './select-login.component.css'
})

export class SelectLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.redirectBasedOnRole();
    }
  }

  navigateToAdminLogin(): void {
    this.router.navigate(['/admin/login']);
  }

  navigateToUserLogin(): void {
    this.router.navigate(['/user/login']);
  }

  private redirectBasedOnRole(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/user/dashboard']);
    }
  }
}
