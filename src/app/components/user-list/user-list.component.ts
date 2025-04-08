import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }

  getUserProfiles(user: User): string[] {
    const profiles = [];
    if (user.flatOwnerProfile) profiles.push('Flat Owner');
    if (user.adminProfile) profiles.push('Admin');
    if (user.residentProfile) profiles.push('Resident');
    if (user.staffProfile) profiles.push('Staff');
    return profiles;
  }

  getSideRoles(user: User): string {
    if (!user.roles || user.roles.length === 0) return 'None';
    return user.roles.join(', ');
  }
}
