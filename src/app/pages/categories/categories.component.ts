import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Category } from '../../Modeles/Category';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  loading = false;
  errorMessage = "";
  isAdmin: boolean = false;

  displayedColumns: string[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.role$.subscribe(role => {

      this.isAdmin = role === 'Admin';

      if (this.isAdmin) {
        this.displayedColumns = ['productCategoryID', 'name', 'actions'];
      } else {
        this.displayedColumns = ['productCategoryID', 'name'];
      }

    });

    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;

    this.apiService.getCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
        this.loading = false;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur chargement catégories";
        this.loading = false;
      }
    });
  }


  openCategoryModal() {

    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.addCategory(result).subscribe(() => {
          this.refreshAll();
        });
      }
    });
  }

  refreshAll() {
    this.loadCategories();
  }
  openEditCategoryModal(category: Category) {

    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '400px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.apiService.updateCategory(result).subscribe({
          next: () => this.refreshAll(),
          error: (err) => console.error(err)
        });

      }

    });
  }

  deleteCategory(id: number) {

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette catégorie sera supprimée définitivement !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {

      if (result.isConfirmed) {

        this.apiService.deleteCategory(id).subscribe({
          next: () => {

            Swal.fire(
              'Supprimé !',
              'La catégorie a été supprimée.',
              'success'
            );

            this.refreshAll();
          },
          error: (err) => {
            console.error(err);

            Swal.fire(
              'Erreur',
              'Impossible de supprimer la catégorie.',
              'error'
            );
          }
        });

      }

    });
  }
}