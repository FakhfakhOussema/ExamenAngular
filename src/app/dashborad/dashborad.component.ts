import { Component, OnInit } from '@angular/core';
import { SubCategory } from '../Modeles/SubCategory';
import { Category } from '../Modeles/Category';
import { Product } from '../Modeles/Product';
import { ApiService } from '../services/api.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashborad.component.html',
  styleUrls: ['dashborad.component.css']
})
export class DashboradComponent implements OnInit {

  categories: Category[] = [];
  subcategories: SubCategory[] = [];
  products: Product[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

loadData() {
  this.api.getCategories().subscribe(categories => {
    this.categories = categories;

    this.api.getSubCategories().subscribe(subcategories => {
      this.subcategories = subcategories;

      this.api.getProducts().subscribe(products => {
        this.products = products;

        this.createChart();
      });
    });
  });
}

createChart() {

  /** ---------- Chart 1 : Produits par catégorie ---------- **/
  const categoryLabels = this.categories.map(c => c.name);
  const categoryData = this.categories.map(c =>
    this.getProductsByCategory(c.productCategoryID)
  );

  new Chart('productsChart', {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: 'Produits par catégorie',
        data: categoryData,
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });


  /** ---------- Chart 2 : Produits par sous-catégorie ---------- **/
  const subLabels = this.subcategories.map(s => s.name);
  const subData = this.subcategories.map(s =>
    this.getProductsBySubCategory(s.productSubcategoryID)
  );

  new Chart('subProductsChart', {
    type: 'bar',
    data: {
      labels: subLabels,
      datasets: [{
        label: 'Produits par sous-catégorie',
        data: subData,
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });


  /** ---------- Chart 3 : Répartition globale (Pie Chart) ---------- **/
  const pieData = this.categories.map(c =>
    this.getProductsByCategory(c.productCategoryID)
  );

  new Chart('productsPieChart', {
    type: 'pie',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: 'Répartition produits',
        data: pieData
      }]
    },
    options: { responsive: true }
  });
}

  getProductsByCategory(categoryId: number): number {
    const subIds = this.subcategories
      .filter(s => s.productCategoryID === categoryId)
      .map(s => s.productSubcategoryID);

    return this.products.filter(p =>
      subIds.includes(p.productSubcategoryID!)
    ).length;
  }

  getProductsBySubCategory(subId: number): number {
    return this.products.filter(p =>
      p.productSubcategoryID === subId
    ).length;
  }
}