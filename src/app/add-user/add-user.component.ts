import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;

  profileOptions = ['Flat Owner', 'Admin', 'Resident', 'Staff'];
  roleOptions = ['Apartment Manager', 'Super Admin'];

  showRoleSelect = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile: ['', Validators.required],
      role: [''] // role boş başlasın
    });

    this.addUserForm.get('profile')?.valueChanges.subscribe((selectedProfile) => {
      if (selectedProfile === 'Admin') {
        this.showRoleSelect = true;
        this.addUserForm.get('role')?.setValue(''); // boş bırak, kullanıcı seçsin
      } else {
        this.showRoleSelect = false;
        this.addUserForm.get('role')?.setValue(selectedProfile); // role = profile
      }
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const newUser = this.addUserForm.value;

      this.userService.createUser(newUser).subscribe({
        next: () => {
          alert('User created successfully!');
          this.router.navigate(['/users']); // Redirect back to user list
        },
        error: (err: any) => {
          console.error('Error creating user:', err);
          alert('Failed to create user.');
        }
      });
    } else {
      this.addUserForm.markAllAsTouched();
    }
  }
}

//private fb: FormBuilder,
//private userService: UserService,
//private router: Router
