import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { ToolComponent } from './tool/tool.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddSubcategoryComponent } from './pages/subcategories/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './pages/subcategories/edit-subcategory/edit-subcategory.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';


const routes: Routes = [

  // Login
  {
    path: 'login',
    component: LoginComponent
  },

  // Redirect root → login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
  path: 'subcategories',
  component: SubcategoriesComponent,
  },
  {
  path: 'subcategories/add',
  component: AddSubcategoryComponent
  },
  {
  path: 'subcategories/edit/:id',
  component: EditSubcategoryComponent
  },
  {
  path: 'categories',
  component: CategoriesComponent,
  },
  {
  path: 'products',
  component: ProductsComponent,
  },
  {
  path: 'products/add',
  component: ProductFormComponent
},
{
  path: 'products/edit/:id',
  component: ProductFormComponent

},


  // Protected routes
  {
    path: 'create',
    component: MemberFormComponent,
    canActivate: [AuthService]
  },
  {
    path: 'dashboard',
    component: DashboradComponent,
    canActivate: [AuthService]
  },
  {
    path: 'tools',
    component: ToolComponent,
    canActivate: [AuthService]
  },
  {
    path: 'events',
    component: EventComponent,
    canActivate: [AuthService]
  },
  {
    path: 'articles',
    component: ArticleComponent,
    canActivate: [AuthService]
  },
  {
    path: 'members',
    component: MemberComponent,
    canActivate: [AuthService]
  },

  // Edit route (dynamic route ⭐)
  {
    path: ':id/edit',
    component: MemberFormComponent,
    canActivate: [AuthService]
  },

  // Wildcard route MUST be last ⭐
  {
    path: '**',
    component: MemberComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }