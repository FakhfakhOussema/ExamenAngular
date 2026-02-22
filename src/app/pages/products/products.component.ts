import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/Modeles/Product';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  subCategories: any[] = [];
  categories: any[] = [];
  loading = false;
  errorMessage = "";

  displayedColumns: string[] = [
    'productID',
    'name',
    'productNumber',
    'standardCost',
    'listPrice',
    'sellStartDate',
    'subcategoryName',
    'categoryName',
    'actions'
  ];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;

    forkJoin({
      products: this.apiService.getProducts(),
      subs: this.apiService.getSubCategories(),
      cats: this.apiService.getCategories()
    }).subscribe({
      next: ({ products, subs, cats }) => {

        this.categories = cats.map(c => ({ ...c, categoryID: Number(c.productCategoryID) }));
        this.subCategories = subs.map(s => ({
          ...s,
          productSubcategoryID: Number(s.productSubcategoryID),
          categoryID: Number(s.productCategoryID)
        }));

        this.products = products.map(p => {
          const sub = this.subCategories.find(s => s.productSubcategoryID === Number(p.productSubcategoryID));
          return {
            ...p,
            subcategory: sub || null,
            category: sub ? this.categories.find(c => c.categoryID === sub.categoryID) || null : null
          };
        });

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur chargement produits";
        this.loading = false;
      }
    });
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  openProductModal() {
    this.router.navigate(['/products/add']);
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteProduct(id).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.productID !== id);
            Swal.fire({
              title: 'Deleted!',
              text: 'The product has been deleted.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Error deleting product:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the product.',
              icon: 'error'
            });
          }
        });
      }
    });
  }
}