import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/Modeles/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading = false;
  errorMessage = "";

  displayedColumns: string[] = [
    'productID',
    'name',
    'productNumber',
    'standardCost',
    'listPrice',
    'sellStartDate',
    'productSubcategoryID',
    'actions'
  ];

  constructor(private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  openProductModal() {
    this.router.navigate(['/products/add']);
  }

  loadProducts() {

    this.loading = true;

    this.apiService.getProducts().subscribe(
      (res: Product[]) => {
        this.products = res;
        this.loading = false;
      },
      (err: any) => {
        console.error(err);
        this.errorMessage = "Erreur chargement produits";
        this.loading = false;
      }
    );
  }
  deleteProduct(id: number) {
    console.log("Delete product with ID:", id);
  }

}