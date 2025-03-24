import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {API_URL} from '../env';
import { firstValueFrom } from 'rxjs';
import { constants } from 'node:zlib';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit {

  // constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log("in init");
    // Call function to handle the callback and extract data from URL
    //this.handleCallback();
    //this.handleCallback(); //.catch(err => console.error('handleCallback error:', err));
    this.route.queryParams.subscribe(params => {
      const userName = params['user_name'];
      const membership = params['membership'];
      const userType = params['user_type'];
      const token = params['token'];
  
      if (userName && token) {    
        localStorage.setItem('user', userName);
        localStorage.setItem('token', token);
        localStorage.setItem('user_type', userType);
        this.router.navigate(['/dashboard']);
      } else {
        console.warn('Missing user data in query params');
      }
    });

  }

/*
  handleCallback() {
    this.authService.handleoauthcallback().subscribe({
        next: (response) => { // Define the expected shape of 'response'
          //alert('Signin successful!');
          console.log("callback");
          console.log(response);
          if (response.error) {
            alert('Signin sso failed: ' + response.error);
          }
          else {
            alert('Signin sso successful!');
            //localStorage.setItem('user', response.user.user_name); // Save JWT token
            //localStorage.setItem('token', response.user.token); // Save JWT token
            //localStorage.setItem('user_type', response.user.user_type); // Save JWT token
            console.log(response.user);
            //this.router.navigate(['/dashboard']); // Navigate to products page
          }
        },
        error: (error: any) => alert('Signin sso failed: ' + error.error.error),
      });
  } */
}
