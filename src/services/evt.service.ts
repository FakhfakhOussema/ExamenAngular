import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/app/Modeles/Evt';


@Injectable({
  providedIn: 'root'
})
export class EvtService {
  private baseUrl = "http://localhost:3000/Evt";

  constructor(private http: HttpClient) { }
    getAllEvents(): Observable<Evt[]> {
      return this.http.get<Evt[]>(this.baseUrl);
  }
  addEvent(event: Evt): Observable<Evt> {
    return this.http.post<Evt>(this.baseUrl, event);
  }

  deleteEvent(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getEventById(id: string): Observable<Evt> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Evt>(url);
  }
  updateEvent(id: string, event: Evt): Observable<Evt> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Evt>(url, event);
  }
}
