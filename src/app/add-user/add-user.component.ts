import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddUserComponent {
  userForm: FormGroup;
  newUser:any = {}
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      passwordHash: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      this.newUser = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        passwordHash: formValue.passwordHash,
      };
  
      this.userService.createUser(this.newUser).subscribe({
        next: () => {
          alert('User created successfully!');
          this.router.navigate(['/users']);
        },
        error: (err: any) => {
          console.error(err);
          alert('Something went wrong.');
        }
      });
    }
  }

  

}


//private fb: FormBuilder,
//private userService: UserService,
//private router: Router
