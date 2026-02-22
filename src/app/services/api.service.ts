import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Modeles/Category';
import { SubCategory } from '../Modeles/SubCategory';
import { Product } from 'src/app/Modeles/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://localhost:7250/api";

  constructor(private http: HttpClient) { }

  getSubCategories() {
    return this.http.get<SubCategory[]>(`${this.baseUrl}/ProductSubcategories`);
  }
  // ADD subcategory
  addSubCategory(subCategory: SubCategory) {
    return this.http.post(`${this.baseUrl}/ProductSubcategories`, subCategory);
  }
  getSubCategoryById(id: number) {
    return this.http.get<SubCategory>(`${this.baseUrl}/ProductSubcategories/${id}`);
  }
  updateSubCategory(subCategory: SubCategory) {
    return this.http.put(
      `${this.baseUrl}/ProductSubcategories/${subCategory.productSubcategoryID}`,
      subCategory
    );
  }
  deleteSubCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/ProductSubcategories/${id}`);
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/ProductCategories`);
  }
  addCategory(category: Category) {
    return this.http.post(`${this.baseUrl}/ProductCategories`, category);
  }
  getCategoryById(id: number) {
    return this.http.get<Category>(`${this.baseUrl}/ProductCategories/${id}`);
  }
  updateCategory(category: Category) {
    return this.http.put(`${this.baseUrl}/ProductCategories/${category.productCategoryID}`, category);
  }
  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/ProductCategories/${id}`);
  }
  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/Products`);
  }
  addProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseUrl}/Products`,
      product
    );
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseUrl}/Products/${product.productID}`,
      product
    );
  }
  getProductById(id: number) {
    return this.http.get<Product>(
      `${this.baseUrl}/Products/${id}`
    );
  }
}