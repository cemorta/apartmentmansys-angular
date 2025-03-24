import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApartmentService } from '../services/apartment.service';
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
