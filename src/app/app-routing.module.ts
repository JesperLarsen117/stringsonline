import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { ProdukterComponent } from './pages/produkter/produkter.component';


const routes: Routes = [
  { path: '', redirectTo: 'forside', pathMatch: 'full' },
  { path: 'forside', component: FrontpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'produkter/:id', component: ProdukterComponent },
  { path: 'produkt/:id', component: ProductComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
