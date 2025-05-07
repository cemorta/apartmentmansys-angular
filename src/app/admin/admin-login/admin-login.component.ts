import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})

export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.adminLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in as admin
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.adminLoginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const email = this.adminLoginForm.get('email')?.value;
    const password = this.adminLoginForm.get('password')?.value;

    this.authService.adminLogin(email, password).subscribe({
      next: (response) => {
        this.loading = false;

        // Verify admin status
        if (response.adminProfile) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'You do not have admin privileges.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Admin login failed. Please check your credentials.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/select-login']);
  }
}
