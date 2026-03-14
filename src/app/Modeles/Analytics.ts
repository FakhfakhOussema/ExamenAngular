export interface Kpis {
  totalSales: number;
  ordersCount: number;
  totalQty: number;
  avgOrderValue: number;
  avgUnitPrice?: number;
  discountRate?: number;
}

export interface PeriodRow {
  year: number;
  month?: number | null;
  sales: number;
  orders?: number;
  qty?: number;
}

export interface ChannelRow {
  salesChannelName: string;
  sales: number;
  orders?: number;
  qty?: number;
}

export interface KeyValueRow {
  key: string;
  subKey?: string;
  sales: number;
  qty?: number;
  orders?: number;
  avgUnitPrice?: number;
  discountRate?: number;
}
