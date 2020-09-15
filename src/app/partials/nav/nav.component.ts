import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  totalNumberOfItems: any;
  totalItems: any = 0;
  constructor(private fb: FormBuilder, private cookie: CookieService, public auth: AuthService, private cart: CartService, private http: HttpService) { }
  search = this.fb.group({
    search: ['']
  });
  async ngOnInit(): Promise<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    this.totalNumberOfItems = await this.http.getCart({ headers }).toPromise();
    this.totalNumberOfItems = this.totalNumberOfItems.cartlines;
    this.totalNumberOfItems = this.totalNumberOfItems ? this.totalNumberOfItems : [{ quantity: 0 }]
    for (const item of this.totalNumberOfItems) {
      this.totalItems = (item.quantity) ? +this.totalItems + +item.quantity : 0
    }
    this.cart.cartSubject.subscribe(async status => {
      let amount = 0;
      this.totalNumberOfItems = await this.http.getCart({ headers }).toPromise();
      this.totalNumberOfItems = this.totalNumberOfItems.cartlines;

      if (this.totalNumberOfItems) {
        for (const item of this.totalNumberOfItems) {
          amount = (item.quantity) ? amount + +item.quantity : 0
        }
        this.totalItems = amount
      } else {
        this.totalItems = 0
      }
    })


  }

}
