import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}
  menuOpen: boolean = false;

toggleMenu(): void {
  this.menuOpen = !this.menuOpen;
}
 user_name = localStorage.getItem('user'); // Save JWT token
        
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Navigate to the login page
  }
}