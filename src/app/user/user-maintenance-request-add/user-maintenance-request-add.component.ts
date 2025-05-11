import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-maintenance-request-add',
  standalone: false,
  templateUrl: './user-maintenance-request-add.component.html',
  styleUrl: './user-maintenance-request-add.component.css'
})
export class UserMaintenanceRequestAddComponent implements OnInit {
  requestForm: FormGroup;
  categoryOptions = ['PLUMBING', 'ELECTRICAL', 'HVAC', 'APPLIANCE', 'GENERAL'];
  userId = JSON.parse(localStorage.getItem('currentUser') || '{}')?.id;

  constructor(
    private fb: FormBuilder,
    private maintenanceRequestService: MaintenanceRequestService,
    private router: Router
  ) {
    // 👇 flatId alanını form grubuna ekliyoruz
    this.requestForm = this.fb.group({
      flatId: [null, [Validators.required]],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.requestForm.invalid) {
      return;
    }

    const requestData = {
      flatId: this.requestForm.value.flatId,
      description: this.requestForm.value.description,
      category: this.requestForm.value.category,
      residentUserId: this.userId, // 👈 backend DTO'daki alan adını kullandık
    };

    this.maintenanceRequestService.createMaintenanceRequest(requestData).subscribe({
      next: () => this.router.navigate(['/user/my-maintenance-requests']),
      error: (err) => console.error('Error creating request:', err)
    });
  }
}
