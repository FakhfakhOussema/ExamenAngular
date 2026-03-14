import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let httpMock: HttpTestingController;

  const baseUrl = 'https://localhost:7250/api/analytics';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(AnalyticsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call getKpis with year parameter', () => {
    const mockResponse = {
      totalSales: 1000,
      ordersCount: 20,
      totalQty: 50,
      avgOrderValue: 50
    };

    service.getKpis(2025).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r => r.url === `${baseUrl}/kpis` && r.params.get('year') === '2025'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSalesByPeriod with year and grain', () => {
    const mockResponse = [
      { year: 2025, month: 1, sales: 100 },
      { year: 2025, month: 2, sales: 200 }
    ];

    service.getSalesByPeriod(2025, 'month').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseUrl}/sales/period` &&
        r.params.get('year') === '2025' &&
        r.params.get('grain') === 'month'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSalesByProduct with year and top', () => {
    const mockResponse = [
      { key: 'Produit A', sales: 500 },
      { key: 'Produit B', sales: 300 }
    ];

    service.getSalesByProduct(2025, 10).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseUrl}/sales/product/top` &&
        r.params.get('year') === '2025' &&
        r.params.get('top') === '10'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSalesByClient with year and top', () => {
    const mockResponse = [
      { key: 'Client A', sales: 700 }
    ];

    service.getSalesByClient(2025, 5).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseUrl}/sales/client/top` &&
        r.params.get('year') === '2025' &&
        r.params.get('top') === '5'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSalesByChannel with year', () => {
    const mockResponse = [
      { salesChannelName: 'Online', sales: 1000 },
      { salesChannelName: 'Reseller', sales: 800 }
    ];

    service.getSalesByChannel(2025).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseUrl}/sales/channel` &&
        r.params.get('year') === '2025'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSalesByTerritory with year', () => {
    const mockResponse = [
      { key: 'North', sales: 900 }
    ];

    service.getSalesByTerritory(2025).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseUrl}/sales/territory` &&
        r.params.get('year') === '2025'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSalesBySalePerson with year and top', () => {
    const mockResponse = [
      { key: 'Ali', sales: 1500 }
    ];

    service.getSalesBySalePerson(2025, 3).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseUrl}/sales/salesperson/top` &&
        r.params.get('year') === '2025' &&
        r.params.get('top') === '3'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSalesByPromotion with year and top', () => {
    const mockResponse = [
      { key: 'Promo X', sales: 400 }
    ];

    service.getSalesByPromotion(2025, 2).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseUrl}/sales/promotion/top` &&
        r.params.get('year') === '2025' &&
        r.params.get('top') === '2'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getSalesByPeriod with grain year', () => {
    const mockResponse = [
      { year: 2024, sales: 1200 }
    ];

    service.getSalesByPeriod(2024, 'year').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseUrl}/sales/period` &&
        r.params.get('year') === '2024' &&
        r.params.get('grain') === 'year'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});