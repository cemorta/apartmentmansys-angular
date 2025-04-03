import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApartmentService} from '../services/apartment.service';
import {Apartment} from '../models/apartment.model';
import {Flat} from '../models/flat.model';
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

  viewMode: 'table' | 'visual' = 'table';
  selectedFlat: Flat | null = null;

  // Method to sort ownerships by isActive (active first) and startDate (newest first)
  sortedOwnerships(): ApartmentOwnership[] {
    if (!this.apartment || !this.apartment.ownerships) {
      return [];
    }

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

  // Get unique floor numbers from flats
  getUniqueFloors(): number[] {
    const floors = this.apartment?.apartmentFlats?.map(flat => flat.floorNumber);
    return [...new Set(floors)].sort((a, b) => a - b);
  }

  // Get flats for a specific floor
  getFlatsForFloor(floor: number): Flat[] | undefined {
    return this.apartment?.apartmentFlats?.filter(flat => flat.floorNumber === floor);
  }

  // Action methods
  createNewFlat(): void {
    // Navigate to flat creation page or open modal
    console.log('Creating new flat');
    // this.router.navigate(['flats/create'], { queryParams: { apartmentId: this.apartment.id } });
  }

  viewFlatDetails(flatId: number): void {
    console.log('Viewing flat details for ID:', flatId);
    // this.router.navigate([`flats/${flatId}`]);
  }

  editFlat(flatId: number): void {
    console.log('Editing flat with ID:', flatId);
    // this.router.navigate([`flats/${flatId}/edit`]);
  }

  removeFlat(flatId: number): void {
    if (confirm('Are you sure you want to remove this flat?')) {
      console.log('Removing flat with ID:', flatId);
      // this.flatService.deleteFlat(flatId).subscribe(...);
    }
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
