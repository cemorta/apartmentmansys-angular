import { Component } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { Apartment } from '../models/apartment.model';

@Component({
  selector: 'app-apartment-create',
  standalone: false,
  templateUrl: './apartment-create.component.html',
  styleUrl: './apartment-create.component.css'
})
export class ApartmentCreateComponent {
  apartment: Apartment = {
    id: 0,
    buildingName: '',
    unitNumber: '',
    floor: 0
  };

  isSubmitted = false;
  errorMessage = '';

  constructor(
    private apartmentService: ApartmentService,
  ) {}

  onSubmit(): void {
    this.apartmentService.createApartment(this.apartment).subscribe({
      next: () => {
        this.isSubmitted = true;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Failed to add apartment', err);
        this.errorMessage = 'Failed to create apartment. Please try again.';
      }
    });
  }
}
