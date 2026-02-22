import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://localhost:7250/api";

  constructor(private http: HttpClient) { }

  // ===== Categories =====
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Categories`);
  }

  getCategoryById(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Categories/${id}`);
  }

  // ===== Products =====
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Products`);
  }

  addProduct(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Products`, data);
  }

  updateProduct(id:number, data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Products/${id}`, data);
  }

  deleteProduct(id:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Products/${id}`);
  }
}