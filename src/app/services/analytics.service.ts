// analytics.service.ts (extraits)
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChannelRow, Kpis, PeriodRow, KeyValueRow } from '../Modeles/Analytics';

export type Grain = 'year' | 'month' | 'monthetails';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private baseUrl = 'https://localhost:7250/api/analytics';

  constructor(private http: HttpClient) {}

  getKpis(year?: number): Observable<Kpis> {
    const params = year ? new HttpParams().set('year', year) : new HttpParams();
    return this.http.get<Kpis>(`${this.baseUrl}/kpis`, { params });
  }

  getSalesByPeriod(year: number, grain: Grain = 'month'): Observable<PeriodRow[]> {
    const actualGrain = grain === 'month' ? 'month' : grain;
    const params = new HttpParams().set('year', year).set('grain', actualGrain);
    return this.http.get<PeriodRow[]>(`${this.baseUrl}/sales/period`, { params });
  }

  getSalesByProduct(year: number, top = 10): Observable<KeyValueRow[]> {
    const params = new HttpParams().set('year', year).set('top', top);
    return this.http.get<KeyValueRow[]>(`${this.baseUrl}/sales/product/top`, { params });
  }

  getSalesByClient(year: number, top = 10): Observable<KeyValueRow[]> {
    const params = new HttpParams().set('year', year).set('top', top);
    return this.http.get<KeyValueRow[]>(`${this.baseUrl}/sales/client/top`, { params });
  }

  getSalesByChannel(year: number): Observable<ChannelRow[]> {
    const params = new HttpParams().set('year', year);
    return this.http.get<ChannelRow[]>(`${this.baseUrl}/sales/channel`, { params });
  }

  getSalesByTerritory(year: number): Observable<KeyValueRow[]> {
    const params = new HttpParams().set('year', year);
    return this.http.get<KeyValueRow[]>(`${this.baseUrl}/sales/territory`, { params });
  }

  getSalesBySalePerson(year: number, top = 10): Observable<KeyValueRow[]> {
    const params = new HttpParams().set('year', year).set('top', top);
    return this.http.get<KeyValueRow[]>(`${this.baseUrl}/sales/salesperson/top`, { params });
  }

  getSalesByPromotion(year: number, top = 10): Observable<KeyValueRow[]> {
    const params = new HttpParams().set('year', year).set('top', top);
    return this.http.get<KeyValueRow[]>(`${this.baseUrl}/sales/promotion/top`, { params });
  }
}