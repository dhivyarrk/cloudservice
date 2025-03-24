import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';  // Import the service
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];  // List of items in the cart
  totalAmount: number = 0;  // Total price of the cart
  token: string;  // Store the authorization token
  loading: boolean = false;  // Track loading state

  constructor(private checkoutService: CheckoutService) {
    this.token = localStorage.getItem('token') || '';  // Assuming token is stored in localStorage
  }

  ngOnInit(): void {
    // For demonstration, you would normally fetch cart items from the backend or localStorage
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    //this.info = JSON(this.cartItems);
    this.calculateTotal();
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0);
  }
  checkout(): void {
    if (!this.token) {
      alert('Please log in to complete the checkout.');
      return;
    }

    this.loading = true;
    this.checkoutService.checkout(this.cartItems).subscribe(
      (response) => {
        alert('Checkout successful!');
        this.cartItems = [];  // Clear the cart
        localStorage.removeItem('cartItems');  // Remove cart items from localStorage
        this.loading = false;
      },
      (error) => {
        alert('Failed to process checkout');
        this.loading = false;
      }
    );
  }
}