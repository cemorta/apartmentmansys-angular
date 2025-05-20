import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmenityService } from '../../services/amenity.service';
import { Amenity } from '../../models/amenity.model';

@Component({
  selector: 'app-amenity-form',
  standalone: false,
  templateUrl: './amenity-form.component.html',
  styleUrl: './amenity-form.component.scss'
})

export class AmenityFormComponent implements OnInit {
  amenityForm: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;
  timeSliceOptions = [15, 30, 45, 60, 90, 120];

  constructor(
    private fb: FormBuilder,
    private amenityService: AmenityService,
    private router: Router
  ) {
    this.amenityForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      openingHour: ['08:00', Validators.required],
      closingHour: ['20:00', Validators.required],
      maxPerson: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      timeSliceMinutes: [30, Validators.required]
    });
  }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  onSubmit(): void {
    if (this.amenityForm.invalid) {
      this.markFormGroupTouched(this.amenityForm);
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    this.amenityService.createAmenity(this.amenityForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/admin/amenities']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitError = 'Failed to save amenity. Please try again.';
        console.error('Error saving amenity', error);
      }
    });
  }

  // Helper method to validate all form fields when submit is clicked
  protected markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Validation helpers
  get titleControl() { return this.amenityForm.get('title'); }
  get openingHourControl() { return this.amenityForm.get('openingHour'); }
  get closingHourControl() { return this.amenityForm.get('closingHour'); }
  get maxPersonControl() { return this.amenityForm.get('maxPerson'); }
  get timeSliceMinutesControl() { return this.amenityForm.get('timeSliceMinutes'); }
}
