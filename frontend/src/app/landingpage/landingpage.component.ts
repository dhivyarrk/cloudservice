import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login();
  }
}
