import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/Modeles/Category';
import { SubCategory } from 'src/app/Modeles/SubCategory';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html'
})
export class EditSubcategoryComponent implements OnInit {

  categories: Category[] = [];
  form!: FormGroup;

  isEditMode = false;
  subCategoryId!: number;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      productCategoryID: new FormControl(null, Validators.required)
    });

    this.loadCategories();

    // ⭐ Detect ID from URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.subCategoryId = +id;
      this.loadSubCategory(this.subCategoryId);
    }
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  loadSubCategory(id: number) {

    this.apiService.getSubCategoryById(id).subscribe(res => {

      this.form.patchValue({
        name: res.name,
        productCategoryID: res.productCategoryID
      });

    });
  }

  save() {

    if (this.form.invalid) return;

    const subCategory: SubCategory = {
      productSubcategoryID: this.isEditMode ? this.subCategoryId : 0,
      ...this.form.value
    };

    // ⭐ Update Mode
    if (this.isEditMode) {

      this.apiService.updateSubCategory(subCategory).subscribe(() => {
        this.router.navigate(['/subcategories']);
      });

    }
  }
}