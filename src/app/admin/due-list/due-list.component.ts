
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DueService } from '../../services/due.service';
import { Due } from '../../models/due.model';

@Component({
  selector: 'app-due-list',
  standalone: false,
  templateUrl: './due-list.component.html',
  styleUrl: './due-list.component.css'
})

export class DueListComponent implements OnInit {
  apartmentId: number;
  dues: Due[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private dueService: DueService
  ) {
    this.apartmentId = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apartmentId = +params['id']; // Convert string to number
      this.loadDues();
    });
  }

  loadDues(): void {
    this.loading = true;
    this.dueService.getDuesByApartmentId(this.apartmentId)
      .subscribe({
        next: (data) => {
          this.dues = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load dues. Please try again later.';
          this.loading = false;
          console.error('Error loading dues:', err);
        }
      });
  }
}
