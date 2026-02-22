import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/Modeles/Product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;

  subCategories: any[] = [];

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
      standardCost: new FormControl(0),
      listPrice: new FormControl(0),
      sellStartDate: new FormControl<string | null>(null),
      productSubcategoryID: new FormControl(null)
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct(this.productId);
    }

    this.loadSubCategories();
  }

  loadProduct(id: number) {

    this.api.getProductById(this.productId).subscribe(res => {

      if (res.sellStartDate) {
        res.sellStartDate = res.sellStartDate.split('T')[0];
      }

      this.form.patchValue(res);

    });

  }

  loadSubCategories() {
    this.api.getSubCategories().subscribe(res => {
      this.subCategories = res;
    });
  }

  save() {

    if (this.form.invalid) return;

    const product: Product = {
      productID: this.isEditMode ? this.productId : 0,
      ...this.form.value
    };

    if (this.isEditMode) {

      this.api.updateProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });

    } else {

      this.api.addProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });

    }
  }

}