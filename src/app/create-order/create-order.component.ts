import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderItem, Order } from '../models/order.model';

@Component({
  selector: 'app-create-order',
  standalone: false,
  templateUrl: './create-order.component.html',
  styles: ``
})
export class CreateOrderComponent {
  // Mock products
  products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Smartphone', price: 800 },
    { id: 3, name: 'Headphones', price: 100 }
  ];

  cartItems: OrderItem[] = [];
  customerID = 1; // Fixed customer ID for demo
  loading = false;
  error = '';

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.product_id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.total_price = existingItem.quantity * existingItem.unit_price;
    } else {
      this.cartItems.push({
        product_id: product.id,
        name: product.name,
        quantity: 1,
        unit_price: product.price,
        total_price: product.price
      });
    }
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total_price, 0);
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      this.error = 'Cart is empty';
      return;
    }

    this.loading = true;
    this.error = '';

    const order: Order = {
      customer_id: this.customerID,
      items: this.cartItems,
      total_amount: this.getTotalAmount()
    };

    this.orderService.createOrder(order).subscribe({
      next: (createdOrder) => {
        this.loading = false;
        this.router.navigate(['/confirmation', createdOrder.id]);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to create order: ' + (err.message || 'Unknown error');
        console.error('Order creation error:', err);
      }
    });
  }
}
