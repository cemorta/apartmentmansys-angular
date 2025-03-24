import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Apartment} from '../models/apartment.model';

@Component({
  selector: 'app-apartment-list',
  standalone: false,
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css'
})
export class ApartmentListComponent implements OnInit {

  apartments: Apartment[] = [
    { id: 1, building_name: 'A Block', unit_number: '101', floor: 1 },
    { id: 2, building_name: 'B Block', unit_number: '202', floor: 2 },
    { id: 3, building_name: 'C Block', unit_number: '303', floor: 3 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetails(id: number) {
    this.router.navigate(['/view-apartment', id]);
  }
}
