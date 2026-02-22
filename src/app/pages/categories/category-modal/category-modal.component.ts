import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/Modeles/Category';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html'
})
export class CategoryModalComponent {

  form!: FormGroup;
  isEditMode = false;
  categoryId!: number;

  constructor(
    private dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {

    this.isEditMode = !!data;

    this.form = new FormGroup({
      name: new FormControl(data?.name || '', Validators.required)
    });

    if (data) {
      this.categoryId = data.productCategoryID;
    }
  }

  saveCategory() {

    if (this.form.invalid) return;

    const category: Category = {
      productCategoryID: this.categoryId || 0,
      name: this.form.value.name
    };

    this.dialogRef.close(category);
  }
}