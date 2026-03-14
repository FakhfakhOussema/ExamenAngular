import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, switchMap, of, catchError } from 'rxjs';
import { AnalyticsService, Grain } from '../services/analytics.service';
import { ChannelRow, KeyValueRow, Kpis, PeriodRow } from '../Modeles/Analytics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  yearKpis = 2025;

  yearPeriod = 2025;
  grainPeriod: Grain = 'month';

  yearChannel = 2025;

  yearProducts = 2025;
  topNProducts = 10;

  yearCustomers = 2025;
  topNCustomers = 10;

  yearTerritory = 2025;

  yearSalesPerson = 2025;
  topNSalesPerson = 10;

  yearPromotion = 2025;
  topNPromotion = 10;

  loadingKpis = false;
  loadingPeriod = false;
  loadingChannel = false;
  loadingProducts = false;
  loadingCustomers = false;

  loadingTerritory = false;
  loadingSalesPerson = false;
  loadingPromotion = false;

  errorKpis?: string;
  errorPeriod?: string;
  errorChannel?: string;
  errorProducts?: string;
  errorCustomers?: string;

  errorTerritory?: string;
  errorSalesPerson?: string;
  errorPromotion?: string;

  kpis?: Kpis;

  salesPeriodData: any = { labels: [], datasets: [] };
  channelData: any = { labels: [], datasets: [] };
  topProductsData: any = { labels: [], datasets: [] };
  topCustomersData: any = { labels: [], datasets: [] };

  territoryData: any = { labels: [], datasets: [] };
  salesPersonData: any = { labels: [], datasets: [] };
  promotionData: any = { labels: [], datasets: [] };

  private reloadKpis$ = new Subject<void>();
  private reloadPeriod$ = new Subject<void>();
  private reloadChannel$ = new Subject<void>();
  private reloadProducts$ = new Subject<void>();
  private reloadCustomers$ = new Subject<void>();

  private reloadTerritory$ = new Subject<void>();
  private reloadSalesPerson$ = new Subject<void>();
  private reloadPromotion$ = new Subject<void>();

  private baseOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: window.devicePixelRatio || 1,
    normalized: true,
    animation: { duration: 250 },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          padding: 14,
          font: { size: 12, weight: '600' }
        }
      },
      tooltip: { enabled: true, padding: 12, cornerRadius: 10 }
    }
  };

  lineOptions: any = {
    ...this.baseOptions,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 11 } } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(15,23,42,0.08)' },
        ticks: { color: '#64748b', callback: (v: number) => Intl.NumberFormat().format(v as number), font: { size: 11 } }
      }
    },
    elements: { line: { borderWidth: 2 }, point: { radius: 2, hoverRadius: 5 } }
  };

  barOptions: any = {
    ...this.baseOptions,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 11 } } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(15,23,42,0.08)' },
        ticks: { color: '#64748b', callback: (v: number) => Intl.NumberFormat().format(v as number), font: { size: 11 } }
      }
    }
  };

  barHorizontalOptions: any = {
    ...this.baseOptions,
    indexAxis: 'y',
    scales: {
      y: {
        grid: { display: false },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: (value: any) => value 
        }
      },
      x: {
        beginAtZero: true,
        grid: { color: 'rgba(15,23,42,0.08)' },
        ticks: {
          color: '#64748b',
          callback: (v: number) => Intl.NumberFormat().format(v as number),
          font: { size: 11 }
        }
      }
    }
  };

  doughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: window.devicePixelRatio || 1,
    cutout: '68%',
    radius: '95%',
    layout: { padding: 6 },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 12,
          font: { size: 12, weight: '600' }
        }
      },
      tooltip: { enabled: true, padding: 12, cornerRadius: 10 }
    }
  };

  constructor(private analytics: AnalyticsService) { }

  ngOnInit(): void {

    this.reloadKpis$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.loadingKpis = true; this.errorKpis = undefined;
          return this.analytics.getKpis(this.yearKpis).pipe(
            catchError(() => { this.errorKpis = 'Erreur chargement KPIs'; return of(undefined as unknown as Kpis); })
          );
        })
      )
      .subscribe(k => { this.kpis = k; this.loadingKpis = false; });

    this.reloadPeriod$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.loadingPeriod = true; this.errorPeriod = undefined;
          return this.analytics.getSalesByPeriod(this.yearPeriod, this.grainPeriod).pipe(
            catchError(() => { this.errorPeriod = 'Erreur chargement ventes par période'; return of([] as PeriodRow[]); })
          );
        })
      )
      .subscribe(rows => { this.bindPeriod(rows); this.loadingPeriod = false; });

    this.reloadChannel$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.loadingChannel = true; this.errorChannel = undefined;
          return this.analytics.getSalesByChannel(this.yearChannel).pipe(
            catchError(() => { this.errorChannel = 'Erreur chargement canal'; return of([] as ChannelRow[]); })
          );
        })
      )
      .subscribe(rows => { this.bindChannel(rows); this.loadingChannel = false; });

    this.reloadProducts$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.loadingProducts = true; this.errorProducts = undefined;
          return this.analytics.getSalesByProduct(this.yearProducts, this.topNProducts).pipe(
            catchError(() => { this.errorProducts = 'Erreur chargement top produits'; return of([] as KeyValueRow[]); })
          );
        })
      )
      .subscribe(rows => { this.bindTopProducts(rows); this.loadingProducts = false; });

    this.reloadCustomers$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.loadingCustomers = true; this.errorCustomers = undefined;
          return this.analytics.getSalesByClient(this.yearCustomers, this.topNCustomers).pipe(
            catchError(() => { this.errorCustomers = 'Erreur chargement top clients'; return of([] as KeyValueRow[]); })
          );
        })
      )
      .subscribe(rows => { this.bindTopCustomers(rows); this.loadingCustomers = false; });

    this.reloadTerritory$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.loadingTerritory = true; this.errorTerritory = undefined;
          return this.analytics.getSalesByTerritory(this.yearTerritory).pipe(
            catchError(() => { this.errorTerritory = 'Erreur chargement territoire'; return of([] as KeyValueRow[]); })
          );
        })
      )
      .subscribe(rows => { this.bindTerritory(rows); this.loadingTerritory = false; });

    this.reloadSalesPerson$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.loadingSalesPerson = true; this.errorSalesPerson = undefined;
          return this.analytics.getSalesBySalePerson(this.yearSalesPerson, this.topNSalesPerson).pipe(
            catchError(() => { this.errorSalesPerson = 'Erreur chargement commerciaux'; return of([] as KeyValueRow[]); })
          );
        })
      )
      .subscribe(rows => { this.bindSalesPerson(rows); this.loadingSalesPerson = false; });

    this.reloadPromotion$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.loadingPromotion = true; this.errorPromotion = undefined;
          return this.analytics.getSalesByPromotion(this.yearPromotion, this.topNPromotion).pipe(
            catchError(() => { this.errorPromotion = 'Erreur chargement promotions'; return of([] as KeyValueRow[]); })
          );
        })
      )
      .subscribe(rows => { this.bindPromotion(rows); this.loadingPromotion = false; });

    this.reloadKpis$.next();
    this.reloadPeriod$.next();
    this.reloadChannel$.next();
    this.reloadProducts$.next();
    this.reloadCustomers$.next();
    this.reloadTerritory$.next();
    this.reloadSalesPerson$.next();
    this.reloadPromotion$.next();
  }

  onYearKpisChange() { this.reloadKpis$.next(); }

  onYearPeriodChange() { this.reloadPeriod$.next(); }
  onGrainPeriodChange() { this.reloadPeriod$.next(); }

  onYearChannelChange() { this.reloadChannel$.next(); }

  onYearProductsChange() { this.reloadProducts$.next(); }
  onTopNProductsChange() { this.reloadProducts$.next(); }

  onYearCustomersChange() { this.reloadCustomers$.next(); }
  onTopNCustomersChange() { this.reloadCustomers$.next(); }

  onYearTerritoryChange() { this.reloadTerritory$.next(); }

  onYearSalesPersonChange() { this.reloadSalesPerson$.next(); }
  onTopNSalesPersonChange() { this.reloadSalesPerson$.next(); }

  onYearPromotionChange() { this.reloadPromotion$.next(); }
  onTopNPromotionChange() { this.reloadPromotion$.next(); }

  private bindPeriod(rows: PeriodRow[]) {
    const labels = rows.map(r => (r.month && r.month > 0) ? `${r.year}-${String(r.month).padStart(2, '0')}` : `${r.year}`);
    const values = rows.map(r => r.sales);

    this.salesPeriodData = {
      labels,
      datasets: [{
        data: values,
        label: 'Ventes',
        tension: 0.35,
        fill: true,
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgba(37, 99, 235, 0.18)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 2
      }]
    };
  }

  private bindChannel(rows: ChannelRow[]) {
    const labels = rows.map(r => r.salesChannelName ?? 'N/A');
    const values = rows.map(r => r.sales);
    const palette = ['#2563EB', '#F59E0B', '#10B981', '#EF4444'];

    this.channelData = {
      labels,
      datasets: [{
        data: values,
        label: 'Canal',
        backgroundColor: labels.map((_, i) => palette[i % palette.length]),
        hoverOffset: 6
      }]
    };
  }

  private bindTopProducts(rows: KeyValueRow[]) {
    const labels = rows.map(r => r.key);
    const values = rows.map(r => r.sales);

    this.topProductsData = {
      labels,
      datasets: [{
        data: values,
        label: `Top ${this.topNProducts} Produits`,
        backgroundColor: 'rgba(124, 58, 237, 0.85)',
        borderColor: 'rgba(124, 58, 237, 1)',
        borderWidth: 1,
        borderRadius: 10,
        barPercentage: 0.7,
        categoryPercentage: 0.7
      }]
    };
  }

  private bindTopCustomers(rows: KeyValueRow[]) {
    const labels = rows.map(r => r.key);
    const values = rows.map(r => r.sales);

    this.topCustomersData = {
      labels,
      datasets: [{
        data: values,
        label: `Top ${this.topNCustomers} Clients`,
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 10,
        barPercentage: 0.7,
        categoryPercentage: 0.7
      }]
    };
  }

  private bindTerritory(rows: KeyValueRow[]) {
    const labels = rows.map(r => `${r.key}`);
    const values = rows.map(r => r.sales);

    this.territoryData = {
      labels,
      datasets: [{
        data: values,
        label: 'Ventes par Territoire',
        backgroundColor: 'rgba(59, 130, 246, 0.80)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 10
      }]
    };
  }

  private bindSalesPerson(rows: KeyValueRow[]) {
    const labels = rows.map(r => r.key);
    const values = rows.map(r => r.sales);

    this.salesPersonData = {
      labels,
      datasets: [{
        data: values,
        label: `Top ${this.topNSalesPerson} Commerciaux`,
        backgroundColor: 'rgba(245, 158, 11, 0.85)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
        borderRadius: 10
      }]
    };
  }

  private bindPromotion(rows: KeyValueRow[]) {
    const labels = rows.map(r => r.key);
    const values = rows.map(r => r.sales);

    this.promotionData = {
      labels,
      datasets: [{
        data: values,
        label: `Top ${this.topNPromotion} Promotions`,
        backgroundColor: 'rgba(239, 68, 68, 0.82)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 10
      }]
    };
  }
}