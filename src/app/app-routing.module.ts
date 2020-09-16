import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ErrorComponent } from './pages/error/error.component';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { KurvComponent } from './pages/kurv/kurv.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { ProdukterComponent } from './pages/produkter/produkter.component';
import { SearchComponent } from './pages/search/search.component';
import { TermsoftradeComponent } from './pages/termsoftrade/termsoftrade.component';


const routes: Routes = [
  { path: '', redirectTo: 'forside', pathMatch: 'full' },
  { path: 'forside', component: FrontpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Salgs-og-handelbetingelser', component: TermsoftradeComponent },
  { path: 'Indkøbskurv', component: KurvComponent },
  { path: 'kasse', component: CheckoutComponent },
  { path: 'ordrebekræftelse/:id', component: ConfirmationComponent },
  { path: 'produkter/:type/:typeTwo/:id', component: ProdukterComponent },
  { path: 'produkt/:type/:id', component: ProductComponent },
  { path: 'produkt/:type/:typeTwo/:typeId/:id', component: ProductComponent },
  { path: 'søg/:id', component: SearchComponent },
  { path: 'søg', component: SearchComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
