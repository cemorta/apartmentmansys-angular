import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ApartmentService} from '../services/apartment.service';
import {Apartment} from '../models/apartment.model';

@Component({
  selector: 'app-apartment-list',
  standalone: false,
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css'
})

export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];

  constructor(private apartmentService: ApartmentService, private router: Router) { }

  viewDetails(id: number) {
    this.router.navigate(['/view-apartment', id]);
  }

  ngOnInit(): void {
    this.apartmentService.getAllApartments().subscribe({
      next: (data) => this.apartments = data,
      error: (err) => console.error('Error fetching apartments', err)
    });
  }
}
