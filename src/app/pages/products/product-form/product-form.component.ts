import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/Modeles/Product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  categories: any[] = [];
  subCategories: any[] = [];
  filteredSubCategories: any[] = [];

  isEditMode = false;
  productId!: number;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      productNumber: new FormControl('', Validators.required),
      makeFlag: new FormControl(true),
      finishedGoodsFlag: new FormControl(true),
      safetyStockLevel: new FormControl(1, [Validators.required, Validators.min(1)]),
      reorderPoint: new FormControl(1, [Validators.required, Validators.min(1)]),
      standardCost: new FormControl(0, Validators.min(0)),
      listPrice: new FormControl(0, Validators.min(0)),
      daysToManufacture: new FormControl(0, Validators.min(0)),
      sellStartDate: new FormControl(new Date().toISOString().split('T')[0]),
      categoryID: new FormControl(null, Validators.required),
      productSubcategoryID: new FormControl({ value: null, disabled: true }, Validators.required)
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
    }

    forkJoin({
      cats: this.api.getCategories(),
      subs: this.api.getSubCategories()
    }).subscribe(({ cats, subs }) => {

      this.categories = cats.map(c => ({ ...c, categoryID: Number(c.productCategoryID) }));
      this.subCategories = subs.map(s => ({
        ...s,
        productSubcategoryID: Number(s.productSubcategoryID),
        categoryID: Number(s.productCategoryID)
      }));

      this.setupCategoryWatcher();

      if (this.isEditMode) {
        this.loadProduct(this.productId);
      }
    });
  }

  setupCategoryWatcher() {
    this.form.get('categoryID')?.valueChanges.subscribe(catId => {
      const cat = catId != null ? Number(catId) : null;
      this.filteredSubCategories = cat != null
        ? this.subCategories.filter(s => s.categoryID === cat)
        : [];

      if (cat != null) this.form.get('productSubcategoryID')?.enable();
      else this.form.get('productSubcategoryID')?.disable();

      this.form.get('productSubcategoryID')?.setValue(null);
    });
  }

  loadProduct(id: number) {
    this.api.getProductById(id).subscribe(res => {
      const sellStartDate = res.sellStartDate ? res.sellStartDate.split('T')[0] : null;

      const sub = this.subCategories.find(s => s.productSubcategoryID === Number(res.productSubcategoryID));
      const categoryID = sub ? sub.categoryID : null;

      this.form.get('categoryID')?.setValue(categoryID, { emitEvent: true });

      this.form.patchValue({
        productSubcategoryID: res.productSubcategoryID,
        name: res.name,
        productNumber: res.productNumber,
        standardCost: res.standardCost ?? 0,
        listPrice: res.listPrice ?? 0,
        safetyStockLevel: res.safetyStockLevel ?? 1,
        reorderPoint: res.reorderPoint ?? 1,
        sellStartDate
      }, { emitEvent: false });

      if (categoryID != null) this.form.get('productSubcategoryID')?.enable();
    });
  }

  save() {
    if (this.form.invalid) return;

    const product = {
      ...this.form.value,
      safetyStockLevel: this.form.value.safetyStockLevel || 1,
      reorderPoint: this.form.value.reorderPoint || 1
    };

    const request$ = this.isEditMode
      ? this.api.updateProduct({ productID: this.productId, ...product })
      : this.api.addProduct(product);

    request$.subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}