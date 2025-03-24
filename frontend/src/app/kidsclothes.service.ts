import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from './env';

@Injectable({
  providedIn: 'root'
})
export class KidsclothesService {
  constructor(private http: HttpClient) { }
  getProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${API_URL}/kidsclothes`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  }

  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${API_URL}/kidsclothes`, product, { headers });
  }

  // Delete a product by ID
  deleteProduct(productId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${API_URL}/kidsclothes/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Modify a product by ID
  modifyProduct(productId: number, productData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(
      `${API_URL}/kidsclothes/${productId}`,
      productData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
