export interface Product {
  productID: number;
  name: string;
  productNumber: string;
  standardCost: number;
  listPrice: number;
  reorderPoint: number;
  safetyStockLevel: number;
  sellStartDate: string | null;
  productSubcategoryID: number | null;

  subcategory?: {
    productSubcategoryID: number;
    name: string;
    categoryID: number;
  };
  category?: {
    categoryID: number;
    name: string;
  };
}