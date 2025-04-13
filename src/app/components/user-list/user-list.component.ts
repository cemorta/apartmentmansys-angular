import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filterForm: FormGroup;

  // Pagination
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  // Filter options
  profileOptions = ['All', 'Flat Owner', 'Admin', 'Resident', 'Staff'];
  roleOptions = ['All', 'Apartment Manager', 'Super Admin'];

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      profile: ['All'],
      role: ['All']
    });
  }

  ngOnInit(): void {
    this.setupFormListeners();
    this.loadUsers();
  }

  setupFormListeners(): void {
    // Apply debounce to search field to prevent too many API calls
    this.filterForm.get('search')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.currentPage = 0;
        this.loadUsers();
      });

    // Immediate filtering for dropdown selects
    this.filterForm.get('profile')?.valueChanges.subscribe(() => {
      this.currentPage = 0;
      this.loadUsers();
    });

    this.filterForm.get('role')?.valueChanges.subscribe(() => {
      this.currentPage = 0;
      this.loadUsers();
    });
  }

  loadUsers(): void {
    const searchValue = this.filterForm.get('search')?.value;
    let profileValue = this.filterForm.get('profile')?.value;
    let roleValue = this.filterForm.get('role')?.value;

    // Convert "All" to null for API filtering
    profileValue = profileValue === 'All' ? null : profileValue;
    roleValue = roleValue === 'All' ? null : roleValue;

    this.userService.getUsersFiltered(
      searchValue,
      profileValue,
      roleValue,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (response) => {
        this.users = response.content;
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  clearFilters(): void {
    this.filterForm.reset({
      search: '',
      profile: 'All',
      role: 'All'
    });
    this.currentPage = 0;
    this.loadUsers();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers(); // Reload the list after deletion
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
