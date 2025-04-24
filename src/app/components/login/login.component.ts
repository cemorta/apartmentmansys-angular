import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ]),
    password: new FormControl('', Validators.required),
  });

  loginError = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    const credentials = {
      email: this.email?.value,
      password: this.password?.value
    };

    this.authService.login(credentials)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          // Store user info in local storage for session management
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['/apartments']);
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = 'Invalid email or password';
          console.error('Login failed:', error);
        }
      });
  }
}
