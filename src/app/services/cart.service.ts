import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { HttpService } from './http.service';
import { HttpHeaders } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  headers = new HttpHeaders().set(
    "Authorization",
    `Bearer ${this.cookie.get("token")}`
  );

  cartSubject = new Subject<any>();
  constructor(private http: HttpService, private cookie: CookieService) { }
  // Gets all the information from the cart.
  get() {
    const headers = this.headers
    return this.http.getCart({ headers })
  }
  async deleteItem(id, e) {
    e.currentTarget.parentNode.parentNode.classList.add('deleted');
    console.log(await this.http.deleteItemFromCart(id).toPromise());
    this.cartSubject.next('cart changed');
  }
  // Posts to the cart.
  async addToCart(id) {
    const headers = this.headers
    const body = {
      product_id: id,
      quantity: 1
    };
    let cart = <any>await this.http.getCart({ headers }).toPromise()
    cart = cart.cartlines;
    if (!cart) {
      await this.http.postCart(body, { headers }).toPromise()
      return;
    }
    const check = cart.some(e => e.product_id === id);
    if (check) {
      for (const iterator of cart) {
        if (iterator.product_id === id) {
          const body = await {
            product_id: id,
            field: 'quantity',
            value: +iterator.quantity + 1
          };
          await this.http.patchCart(body, { headers }).toPromise()
          this.cartSubject.next('cart changed');
        }
      }
    } else {
      await this.http.postCart(body, { headers }).toPromise()
      this.cartSubject.next('cart changed');
    }
  }
  async clearCart() {
    await this.http.deleteCart().toPromise();
  }
}
