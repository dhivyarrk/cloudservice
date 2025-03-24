import { Component } from '@angular/core';
import {User} from '../models/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user: User = {
    user_name: '',
    password: '', // New password field
    membership: 'regular', // Default value
    contact_number: undefined,
    email_id: '',
    user_type: 'customer', // Default value
  }
    constructor(private authService: AuthService, private router: Router) {}
    onSubmit() {
      this.authService.signup(this.user).subscribe({
        next: (response) => {
          if (response.error) {
            alert('Signin failed: ' + response.error);
          }
          else {
            alert('Signup successful!');
            localStorage.setItem('user', response.user.user_name); // Save JWT token
            localStorage.setItem('token', response.user.token); // Save JWT token
            localStorage.setItem('user_type', response.user.user_type); // Save JWT token
            this.router.navigate(['/dashboard']); // Navigate to products page
          }
        },
        error: (error) => alert('Error during signup: ' + error.message),
      });
    }
}