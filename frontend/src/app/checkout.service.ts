import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from './env';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) {}

  checkout(cartItems: any[]): Observable<any> {
    const token = localStorage.getItem('token');

    const productData = { items: cartItems };

    return this.http.post(
      `${API_URL}/checkout`,
      productData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
