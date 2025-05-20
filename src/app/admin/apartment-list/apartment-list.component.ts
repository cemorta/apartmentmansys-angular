import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ApartmentService} from '../../services/apartment.service';
import {Apartment} from '../../models/apartment.model';

@Component({
  selector: 'app-apartment-list',
  standalone: false,
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css'
})

export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];

  constructor(private apartmentService: ApartmentService, private router: Router) { }

  viewDues(id: number) {
    this.router.navigate(['/admin/apartments', id, 'dues']);
  }

  viewDetails(id: number) {
    this.router.navigate(['/admin/apartments', id]);
  }

  deleteApartment(id: number): void {
    if (confirm('Are you sure you want to delete this apartment?')) {
      this.apartmentService.deleteApartment(id).subscribe({
        next: () => {
          // Remove from UI without full reload
          this.apartments = this.apartments.filter(ap => ap.id !== id);
        },
        error: (err: any) => {
          console.error('Failed to delete apartment', err);
          alert('Failed to delete. Try again later.');
        }
      });
    }
  }

  ngOnInit(): void {
    this.apartmentService.getApartments().subscribe({
      next: (data) => this.apartments = data,
      error: (err) => console.error('Error fetching apartments', err)
    });
  }
}
