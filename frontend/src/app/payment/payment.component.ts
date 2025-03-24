import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule for ngFor


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentData = {
    paymentMethod: '',
    cardDetails: {
      cardNumber: '',
      expiry: '',
      cvv: ''
    }
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.paymentData.paymentMethod === 'card') {
      alert('Payment successful! Your order is being processed.')
      console.log('Processing card payment with details:', this.paymentData.cardDetails);
    } else {
      alert("Please pay for the Order on delivery.")
      console.log('Order will be paid by cash on delivery.');
    }

    console.log('Payment method:', this.paymentData.paymentMethod);
    localStorage.removeItem('cartItems'); // Assuming token is stored in localStorage
  
    // Simulate payment processing
    //alert('Payment successful! Your order is being processed.');

    // Navigate back to a confirmation page or dashboard
    this.router.navigate(['/dashboard']);
  }
}
