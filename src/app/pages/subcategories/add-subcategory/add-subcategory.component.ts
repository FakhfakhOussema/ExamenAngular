import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/Modeles/Category';
import { SubCategory } from 'src/app/Modeles/SubCategory';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html'
})
export class AddSubcategoryComponent implements OnInit {

  categories: Category[] = [];
  form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      productCategoryID: new FormControl(null, Validators.required)
    });

    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  save() {

    if (this.form.invalid) return;

    const subCategory: SubCategory = this.form.value;

    this.apiService.addSubCategory(subCategory).subscribe({
      next: () => {
        this.router.navigate(['/subcategories']);
      },
      error: (err) => console.error(err)
    });
  }
}