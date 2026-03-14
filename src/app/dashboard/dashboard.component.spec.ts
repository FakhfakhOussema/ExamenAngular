import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { AnalyticsService } from '../services/analytics.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let analyticsSpy: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    analyticsSpy = jasmine.createSpyObj('AnalyticsService', [
      'getKpis',
      'getSalesByPeriod',
      'getSalesByChannel',
      'getSalesByProduct',
      'getSalesByClient',
      'getSalesByTerritory',
      'getSalesBySalePerson',
      'getSalesByPromotion'
    ]);

    analyticsSpy.getKpis.and.returnValue(of({
      totalSales: 10000,
      ordersCount: 100,
      totalQty: 500,
      avgOrderValue: 100
    }));

    analyticsSpy.getSalesByPeriod.and.returnValue(of([
      { year: 2025, month: 1, sales: 1000 },
      { year: 2025, month: 2, sales: 2000 }
    ]));

    analyticsSpy.getSalesByChannel.and.returnValue(of([
      { salesChannelName: 'Online', sales: 7000 },
      { salesChannelName: 'Reseller', sales: 3000 }
    ]));

    analyticsSpy.getSalesByProduct.and.returnValue(of([
      { key: 'Produit A', sales: 2000 },
      { key: 'Produit B', sales: 1500 }
    ]));

    analyticsSpy.getSalesByClient.and.returnValue(of([
      { key: 'Client A', sales: 1200 },
      { key: 'Client B', sales: 900 }
    ]));

    analyticsSpy.getSalesByTerritory.and.returnValue(of([
      { key: 'North', sales: 3000 },
      { key: 'South', sales: 2500 }
    ]));

    analyticsSpy.getSalesBySalePerson.and.returnValue(of([
      { key: 'Ali', sales: 1800 },
      { key: 'Sarra', sales: 1600 }
    ]));

    analyticsSpy.getSalesByPromotion.and.returnValue(of([
      { key: 'Promo 1', sales: 1000 },
      { key: 'Promo 2', sales: 800 }
    ]));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule],
      providers: [
        { provide: AnalyticsService, useValue: analyticsSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all dashboard data on init', fakeAsync(() => {
    fixture.detectChanges(); // ngOnInit
    tick(151);

    expect(analyticsSpy.getKpis).toHaveBeenCalledWith(2025);
    expect(analyticsSpy.getSalesByPeriod).toHaveBeenCalledWith(2025, 'month');
    expect(analyticsSpy.getSalesByChannel).toHaveBeenCalledWith(2025);
    expect(analyticsSpy.getSalesByProduct).toHaveBeenCalledWith(2025, 10);
    expect(analyticsSpy.getSalesByClient).toHaveBeenCalledWith(2025, 10);
    expect(analyticsSpy.getSalesByTerritory).toHaveBeenCalledWith(2025);
    expect(analyticsSpy.getSalesBySalePerson).toHaveBeenCalledWith(2025, 10);
    expect(analyticsSpy.getSalesByPromotion).toHaveBeenCalledWith(2025, 10);

    expect(component.kpis?.totalSales).toBe(10000);
    expect(component.loadingKpis).toBeFalse();
    expect(component.loadingPeriod).toBeFalse();
    expect(component.loadingChannel).toBeFalse();
    expect(component.loadingProducts).toBeFalse();
    expect(component.loadingCustomers).toBeFalse();
    expect(component.loadingTerritory).toBeFalse();
    expect(component.loadingSalesPerson).toBeFalse();
    expect(component.loadingPromotion).toBeFalse();
  }));

  it('should render dashboard title', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h2');
    expect(title?.textContent).toContain('Dashboard');
  }));

  it('should render 4 KPI cards when kpis are loaded', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.kpi-card');
    expect(cards.length).toBe(4);
    expect(compiled.textContent).toContain('CA Total');
    expect(compiled.textContent).toContain('Commandes');
    expect(compiled.textContent).toContain('Quantité');
    expect(compiled.textContent).toContain('Panier Moyen');
  }));

  it('should bind period chart data correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    expect(component.salesPeriodData.labels).toEqual(['2025-01', '2025-02']);
    expect(component.salesPeriodData.datasets[0].data).toEqual([1000, 2000]);
    expect(component.salesPeriodData.datasets[0].label).toBe('Ventes');
  }));

  it('should bind channel chart data correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    expect(component.channelData.labels).toEqual(['Online', 'Reseller']);
    expect(component.channelData.datasets[0].data).toEqual([7000, 3000]);
    expect(component.channelData.datasets[0].label).toBe('Canal');
  }));

  it('should bind top products chart data correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    expect(component.topProductsData.labels).toEqual(['Produit A', 'Produit B']);
    expect(component.topProductsData.datasets[0].data).toEqual([2000, 1500]);
    expect(component.topProductsData.datasets[0].label).toBe('Top 10 Produits');
  }));

  it('should bind top customers chart data correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    expect(component.topCustomersData.labels).toEqual(['Client A', 'Client B']);
    expect(component.topCustomersData.datasets[0].data).toEqual([1200, 900]);
    expect(component.topCustomersData.datasets[0].label).toBe('Top 10 Clients');
  }));

  it('should set errorKpis when getKpis fails', fakeAsync(() => {
    analyticsSpy.getKpis.and.returnValue(
      throwError(() => new Error('API error'))
    );

    fixture.detectChanges();
    tick(151);
    fixture.detectChanges();

    expect(component.errorKpis).toBe('Erreur chargement KPIs');
    expect(component.loadingKpis).toBeFalse();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Erreur chargement KPIs');
  }));

  it('should set errorPeriod when getSalesByPeriod fails', fakeAsync(() => {
    analyticsSpy.getSalesByPeriod.and.returnValue(
      throwError(() => new Error('API error'))
    );

    fixture.detectChanges();
    tick(151);

    expect(component.errorPeriod).toBe('Erreur chargement ventes par période');
    expect(component.loadingPeriod).toBeFalse();
    expect(component.salesPeriodData.labels).toEqual([]);
  }));

  it('should reload KPIs when onYearKpisChange is called', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    analyticsSpy.getKpis.calls.reset();

    component.yearKpis = 2024;
    component.onYearKpisChange();
    tick(151);

    expect(analyticsSpy.getKpis).toHaveBeenCalledWith(2024);
  }));

  it('should reload period data when year changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    analyticsSpy.getSalesByPeriod.calls.reset();

    component.yearPeriod = 2024;
    component.onYearPeriodChange();
    tick(151);

    expect(analyticsSpy.getSalesByPeriod).toHaveBeenCalledWith(2024, 'month');
  }));

  it('should reload period data when grain changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    analyticsSpy.getSalesByPeriod.calls.reset();

    component.grainPeriod = 'year';
    component.onGrainPeriodChange();
    tick(151);

    expect(analyticsSpy.getSalesByPeriod).toHaveBeenCalledWith(2025, 'year');
  }));

  it('should reload products when topNProducts changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    analyticsSpy.getSalesByProduct.calls.reset();

    component.topNProducts = 5;
    component.onTopNProductsChange();
    tick(151);

    expect(analyticsSpy.getSalesByProduct).toHaveBeenCalledWith(2025, 5);
  }));

  it('should reload customers when topNCustomers changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    analyticsSpy.getSalesByClient.calls.reset();

    component.topNCustomers = 7;
    component.onTopNCustomersChange();
    tick(151);

    expect(analyticsSpy.getSalesByClient).toHaveBeenCalledWith(2025, 7);
  }));

  it('should reload territory when year changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    analyticsSpy.getSalesByTerritory.calls.reset();

    component.yearTerritory = 2024;
    component.onYearTerritoryChange();
    tick(151);

    expect(analyticsSpy.getSalesByTerritory).toHaveBeenCalledWith(2024);
  }));

  it('should reload salesperson when topN changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    analyticsSpy.getSalesBySalePerson.calls.reset();

    component.topNSalesPerson = 3;
    component.onTopNSalesPersonChange();
    tick(151);

    expect(analyticsSpy.getSalesBySalePerson).toHaveBeenCalledWith(2025, 3);
  }));

  it('should reload promotion when topN changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(151);

    analyticsSpy.getSalesByPromotion.calls.reset();

    component.topNPromotion = 4;
    component.onTopNPromotionChange();
    tick(151);

    expect(analyticsSpy.getSalesByPromotion).toHaveBeenCalledWith(2025, 4);
  }));
});