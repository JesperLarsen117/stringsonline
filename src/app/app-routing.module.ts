import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { ProdukterComponent } from './pages/produkter/produkter.component';
import { TermsoftradeComponent } from './pages/termsoftrade/termsoftrade.component';


const routes: Routes = [
  { path: '', redirectTo: 'forside', pathMatch: 'full' },
  { path: 'forside', component: FrontpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Salgs-og-handelbetingelser', component: TermsoftradeComponent },
  { path: 'produkter/:type/:typeTwo/:id', component: ProdukterComponent },
  { path: 'produkt/:type/:typeTwo/:typeId/:id', component: ProductComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
