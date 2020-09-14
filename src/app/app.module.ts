import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontpageComponent } from './pages/frontpage/frontpage.component';
import { ErrorComponent } from './pages/error/error.component';
import { NavComponent } from './partials/nav/nav.component';
import { FooterComponent } from './partials/footer/footer.component';
import { BreadcrumbComponent } from './partials/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    ErrorComponent,
    NavComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
