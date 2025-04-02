import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApartmentService } from '../services/apartment.service';
import {Apartment} from '../models/apartment.model';
import {ApartmentOwnership} from '../models/apartment-ownership.model';

@Component({
  selector: 'app-apartment-detail',
  standalone: false,
  templateUrl: './apartment-detail.component.html',
  styleUrl: './apartment-detail.component.css'
})
export class ApartmentDetailComponent implements OnInit {
  apartmentId!: number;
  apartment?: Apartment;
  showAdminsList = true; // Set this to true/false to show/hide the admins list
  // TODO: This should be controlled by user role permission

  // Method to sort ownerships by isActive (active first) and startDate (newest first)
  sortedOwnerships(): ApartmentOwnership[] {
    if (!this.apartment || !this.apartment.ownerships) {
      return [];
    }
    console.log(this.apartment?.id);
    console.log(JSON.stringify(this.apartment));

    return [...this.apartment.ownerships].sort((a, b) => {
      // Sort by active first (active comes first)
      if (a.active !== b.active) {
        return a.active ? -1 : 1;
      }

      // Then sort by startDate (newer dates first)
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateB - dateA;
    });
  }

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit(): void {
    this.apartmentId = +this.route.snapshot.paramMap.get('id')!;
    this.apartmentService.getApartmentById(this.apartmentId).subscribe({
      next: (data) => this.apartment = data,
      error: () => this.apartment = undefined
    });
  }
}
