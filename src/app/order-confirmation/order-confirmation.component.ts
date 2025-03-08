import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-confirmation',
  standalone: false,
  templateUrl: './order-confirmation.component.html',
  styles: ``
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {

  order: Order | null = null;
  loading = true;
  error = '';
  private statusChecker?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrder(+id);

      // Check status every 5 seconds
      this.statusChecker = interval(5000)
        .pipe(switchMap(() => this.orderService.getOrder(+id)))
        .subscribe({
          next: (data) => {
            this.order = data;

            // Stop polling if order is in a terminal state
            if (data.status === 'PAID' || data.status === 'CANCELED') {
              this.statusChecker?.unsubscribe();
            }
          },
          error: (err) => console.error('Error checking order status:', err)
        });
    } else {
      this.loading = false;
      this.error = 'Invalid order ID';
    }
  }

  ngOnDestroy(): void {
    this.statusChecker?.unsubscribe();
  }

  loadOrder(id: number): void {
    this.orderService.getOrder(id).subscribe({
      next: (data) => {
        this.order = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load order: ' + (err.message || 'Unknown error');
        console.error('Error loading order:', err);
      }
    });
  }

  refreshOrder(): void {
    if (this.order?.id) {
      this.loading = true;
      this.loadOrder(this.order.id);
    }
  }

}
