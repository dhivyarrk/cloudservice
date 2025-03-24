import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import {API_URL} from './env';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router: Router, private http: HttpClient) { }
  signup(user: User): Observable<any> {
    console.log("user is", user);
    return this.http.post(`${API_URL}/signup`, user);
  }

  signin(credentials: { email_id: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/signin`, credentials);
  }

  login(): void {
    //private backendLoginUrl = '${API_URL}/login'; // Flask login endpoint

    // Redirect the user to the Flask SSO login endpoint
    console.log("in here login");
    //console.log(${API_URL}"/login")
    //(window as Window).location.href = "http://127.0.0.1:5000/login" //`${API_URL}/signin` // ${API_URL}"/login" //'${API_URL}/login';
    (window as Window).location.href = `${API_URL}/login` //`${API_URL}/signin` // ${API_URL}"/login" //'${API_URL}/login';
 
  }



logout(): void {
  // Clear any stored authentication data (like tokens)
  localStorage.removeItem('token'); // Assuming token is stored in localStorage
  localStorage.removeItem('user_type'); // Assuming token is stored in localStorage
  localStorage.removeItem('cartItems'); // Assuming token is stored in localStorage
  sessionStorage.clear(); // Optionally clear session storage
}
/*
handleoauthcallback(): Observable<any> {
  return this.http.get(`${API_URL}/user_info`);
} */

}