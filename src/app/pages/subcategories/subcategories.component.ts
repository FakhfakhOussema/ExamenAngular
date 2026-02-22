import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SubCategory } from 'src/app/Modeles/SubCategory';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html'
})
export class SubcategoriesComponent implements OnInit {

  dataSource: SubCategory[] = [];

  displayedColumns: string[] = [
    'productSubcategoryID',
    'name',
    'productCategoryID',
    'actions'
  ];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  // ⭐ Navigation Edit
  openEditSubCategory(subCategory: SubCategory) {
    this.router.navigate(['/subcategories/edit', subCategory.productSubcategoryID]);
  }

  // ⭐ Delete SubCategory
  deleteSubCategory(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'This subcategory will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33'
    }).then((result) => {

      if (result.isConfirmed) {

        this.api.deleteSubCategory(id).subscribe({

          next: () => {

            Swal.fire(
              'Deleted!',
              'Subcategory deleted successfully.',
              'success'
            );

            this.loadData();
          },

          error: () => {

            Swal.fire(
              'Error',
              'Delete failed',
              'error'
            );
          }

        });

      }

    });
  }

  // ⭐ Load Data
  loadData() {

    this.api.getSubCategories().subscribe({
      next: (res: SubCategory[]) => {
        this.dataSource = res;
      },
      error: (err) => console.error(err)
    });

  }
}