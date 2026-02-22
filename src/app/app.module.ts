import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { DashboradComponent } from './dashborad/dashborad.component';
import { ToolComponent } from './tool/tool.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { ModalComponent } from './modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { firebaseConfig } from './firebase/environment';
import { HttpClientModule } from '@angular/common/http';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoryModalComponent } from './pages/categories/category-modal/category-modal.component';
import { AddSubcategoryComponent } from './pages/subcategories/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './pages/subcategories/edit-subcategory/edit-subcategory.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberFormComponent,
    DashboradComponent,
    ToolComponent,
    EventComponent,
    ArticleComponent,
    ModalComponent,
    LoginComponent,
    SubcategoriesComponent,
    CategoriesComponent,
    ProductsComponent,
    CategoryModalComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    AngularFireModule.initializeApp (firebaseConfig),
    AngularFireAuthModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
