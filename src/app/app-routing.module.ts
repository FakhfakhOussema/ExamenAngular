import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolComponent } from './tool/tool.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddSubcategoryComponent } from './pages/subcategories/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './pages/subcategories/edit-subcategory/edit-subcategory.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProfilComponent } from './profil/profil.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard.spec';


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
    path: 'signup',
    component: SignupComponent
  },

  // Protected routes
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'subcategories',
    component: SubcategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subcategories/add',
    component: AddSubcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subcategories/edit/:id',
    component: EditSubcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/add',
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/edit/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'create',
    component: MemberFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tools',
    component: ToolComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'articles',
    component: ArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'members',
    component: MemberComponent,
    canActivate: [AuthGuard]
  },

  {
    path: ':id/edit',
    component: MemberFormComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }