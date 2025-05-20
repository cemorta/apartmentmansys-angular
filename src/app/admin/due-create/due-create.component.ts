import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DueService } from '../../services/due.service';

@Component({
  selector: 'app-due-create',
  standalone: false,
  templateUrl: './due-create.component.html',
  styleUrls: ['./due-create.component.scss']
})
export class DueCreateComponent implements OnInit {
  apartmentId: number;
  dueForm: FormGroup;
  loading = false;
  error = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dueService: DueService
  ) {
    this.apartmentId = 0;
    this.dueForm = this.formBuilder.group({
      cost: ['', [Validators.required, Validators.min(0.01)]],
      period: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apartmentId = +params['id']; // Convert string to number
    });

    // Default to current month-year
    const now = new Date();
    const year = now.getFullYear();
    // Month is 0-indexed in JS, add 1 to get 1-12, then pad with leading zero if needed
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    this.dueForm.patchValue({
      period: `${year}${month}`
    });
  }

  get f() { return this.dueForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // If form is invalid, stop here
    if (this.dueForm.invalid) {
      return;
    }

    this.loading = true;
    this.dueService.createDue(
      this.apartmentId,
      this.dueForm.value.cost,
      this.dueForm.value.period
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/apartments', this.apartmentId, 'dues']);
      },
      error: err => {
        this.error = 'Failed to create due. Please try again.';
        this.loading = false;
        console.error('Error creating due:', err);
      }
    });
  }
}
