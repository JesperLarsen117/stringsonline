import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { ErrorComponent } from './pages/error/error.component';
import { NavComponent } from './partials/nav/nav.component';
import { FooterComponent } from './partials/footer/footer.component';
import { BreadcrumbComponent } from './partials/breadcrumb/breadcrumb.component';
import { SideMenuComponent } from './partials/side-menu/side-menu.component';
import { CardComponent } from './pages/frontpage/card/card.component';
import { LoginComponent } from './pages/login/login.component';
// reactive form
import { ReactiveFormsModule } from '@angular/forms';
// http client
import { HttpClientModule } from '@angular/common/http';
import { ProdukterComponent } from './pages/produkter/produkter.component';
import { ProductCardComponent } from './pages/produkter/card/card.component';
import { ProductComponent } from './pages/product/product.component';
import { TermsoftradeComponent } from './pages/termsoftrade/termsoftrade.component';
import { KurvComponent } from './pages/kurv/kurv.component';
import { CartCardComponent } from './pages/kurv/cart-card/cart-card.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { SearchComponent } from './pages/search/search.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { RatingComponent } from './partials/rating/rating.component';
import { CookieBannerComponent } from './partials/cookie-banner/cookie-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    ErrorComponent,
    NavComponent,
    FooterComponent,
    BreadcrumbComponent,
    SideMenuComponent,
    CardComponent,
    LoginComponent,
    ProdukterComponent,
    ProductCardComponent,
    ProductComponent,
    TermsoftradeComponent,
    KurvComponent,
    CartCardComponent,
    CheckoutComponent,
    ConfirmationComponent,
    SearchComponent,
    OrderHistoryComponent,
    RatingComponent,
    CookieBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
