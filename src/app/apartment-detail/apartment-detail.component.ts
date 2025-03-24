import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apartment} from '../models/apartment.model';

@Component({
  selector: 'app-apartment-detail',
  standalone: false,
  templateUrl: './apartment-detail.component.html',
  styleUrl: './apartment-detail.component.css'
})
export class ApartmentDetailComponent implements OnInit {
  apartmentId!: number;
  apartment?: Apartment;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apartmentId = +this.route.snapshot.paramMap.get('id')!;

    // Simulated fetch from backend - replace with service call later
    const mockData: Apartment[] = [
      { id: 1, building_name: 'A Block', unit_number: '101', floor: 1 },
      { id: 2, building_name: 'B Block', unit_number: '202', floor: 2 },
      { id: 3, building_name: 'C Block', unit_number: '303', floor: 3 }
    ];

    this.apartment = mockData.find(ap => ap.id === this.apartmentId);
  }
}
