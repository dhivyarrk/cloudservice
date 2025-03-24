import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule for ngFor

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(): void {
    console.log('Contact Form Submitted:', this.contactData);
    alert('Thank you for reaching out! We will get back to you soon.');
    this.contactData = { name: '', email: '', message: '' }; // Reset form after submission
  }
}
