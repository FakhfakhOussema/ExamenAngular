export interface Product {
  productID: number;
  name: string;
  productNumber: string;
  standardCost: number;
  listPrice: number;
  sellStartDate: string | null;
  productSubcategoryID: number | null;
}