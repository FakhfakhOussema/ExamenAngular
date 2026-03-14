import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "https://localhost:7250/api/Auth";

  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) { }

  // LOGIN
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Login`, data);
  }

  getProfile(): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/Profile`, { headers });
  }

  loadUserRole(): Observable<any> {
    return this.getProfile().pipe(
      tap((profile) => {
        this.roleSubject.next(profile.role);
      }),
      catchError((error) => {
        this.roleSubject.next(null);
        return of(null);
      })
    );
  }


  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  signOut() {
    localStorage.clear();
    this.roleSubject.next(null);
  }

  isAdmin(): boolean {
    return this.roleSubject.value === 'Admin';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");

    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;

      if (Date.now() > exp) {
        this.signOut();
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}