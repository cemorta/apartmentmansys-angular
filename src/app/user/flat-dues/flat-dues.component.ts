import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuePaymentService } from '../../services/due-payment.service';
import { DuePayment } from '../../models/due-payment.model';

@Component({
  selector: 'app-flat-dues',
  standalone: false,
  templateUrl: './flat-dues.component.html',
  styleUrl: './flat-dues.component.scss'
})

export class FlatDuesComponent implements OnInit {
  flatId: number;
  duePayments: DuePayment[] = [];
  loading = true;
  error = '';
  processingPayment = false;
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private duePaymentService: DuePaymentService
  ) {
    this.flatId = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flatId = +params['id']; // Convert string to number
      this.loadFlatDuePayments();
    });
  }

  loadFlatDuePayments(): void {
    this.loading = true;
    this.error = '';

    this.duePaymentService.getDuePaymentsByFlatId(this.flatId).subscribe({
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
          this.loadFlatDuePayments();
        },
        error: (err) => {
          this.processingPayment = false;
          this.error = 'Failed to update payment status. Please try again.';
          console.error('Error marking payment complete:', err);
        }
      });
  }
}
