import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuePaymentService } from '../../services/due-payment.service';
import { DuePayment } from '../../models/due-payment.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-payments',
  standalone: false,
  templateUrl: './user-payments.component.html',
  styleUrl: './user-payments.component.scss'
})
export class UserPaymentsComponent implements OnInit {
  duePayments: DuePayment[] = [];
  loading = true;
  error = '';
  processingPayment = false;
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private duePaymentService: DuePaymentService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadDuePayments();
    });
  }

  loadDuePayments(): void {
    this.loading = true;
    this.error = '';

    this.duePaymentService.getDuePaymentsByUserId(this.authService.getCurrentUser()?.id).subscribe({
      next: (payments) => {
        this.duePayments = payments;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dues. Please try again later.';
        this.loading = false;
        console.error('Error loading flat dues:', err);
      }
    });
  }

  markAsPaid(paymentId: number): void {
    this.processingPayment = true;
    this.successMessage = '';
    this.error = '';

    this.duePaymentService.markPaymentComplete(paymentId)
      .subscribe({
        next: () => {
          this.processingPayment = false;
          this.successMessage = 'Payment marked as complete successfully!';
          // Reload data to refresh payment status
          this.loadDuePayments();
        },
        error: (err) => {
          this.processingPayment = false;
          this.error = 'Failed to update payment status. Please try again.';
          console.error('Error marking payment complete:', err);
        }
      });
  }
}
