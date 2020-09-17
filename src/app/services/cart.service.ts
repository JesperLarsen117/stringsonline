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
  quantity: any;
  cartSubject = new Subject<any>();
  constructor(private http: HttpService, private cookie: CookieService) { }
  // Gets all the information from the cart.
  get() {
    const headers = this.headers
    return this.http.getCart({ headers })

  }
  async deleteItem(id, e) {
    if (e === null) {
      console.log(await this.http.deleteItemFromCart(id).toPromise());
      this.cartSubject.next('cart changed');
    } else {
      e.currentTarget.parentNode.parentNode.classList.add('deleted');
      console.log(await this.http.deleteItemFromCart(id).toPromise());
      this.cartSubject.next('cart changed');
    }

  }
  // Posts to the cart.
  async addToCart(id, amount) {
    console.log();

    const headers = this.headers
    const body = {
      product_id: id,
      quantity: +amount
    };
    let cart = <any>await this.http.getCart({ headers }).toPromise()
    cart = cart.cartlines;
    // check if there is anything in cart. if there isn't, run the code.
    if (!cart) {
      await this.http.postCart(body, { headers }).toPromise()
      this.cartSubject.next('cart changed');
    } else {
      // sort through cart, to match id from database, with product_id. If true patch the value. (plus value with amount)
      const check = cart.some(e => e.product_id === id);
      if (check) {
        for (const iterator of cart) {
          if (iterator.product_id === id) {
            const body = {
              product_id: id,
              field: 'quantity',
              value: +iterator.quantity + +amount
            };
            // execute patch.
            await this.http.patchCart(body, { headers }).toPromise()
            this.cartSubject.next('cart changed');
          }
        }
        // if the product does not exist in the database, post a new product to cart.
      } else {
        await this.http.postCart(body, { headers }).toPromise()
        this.cartSubject.next('cart changed');
      }
    }
  }
  // adds one to the products quantity.
  addQuantity(quantity, id) {
    const headers = this.headers;
    const body = {
      product_id: id,
      field: 'quantity',
      value: +quantity + 1
    }
    this.http.patchCart(body, { headers }).subscribe(res => {
      this.cartSubject.next('cart changed');
    });
  }
  // subtact one from the products quantity.
  subtractQuantity(quantity, id, cartId, e) {
    this.quantity = +quantity - 1;
    const body = {
      product_id: id,
      field: 'quantity',
      value: +quantity - 1
    }
    const headers = this.headers;
    if (this.quantity <= 0) {
      // delete animation.
      e.currentTarget.parentNode.parentNode.parentNode.parentNode.classList.add('deleted');
      this.deleteItem(cartId, null);
    } else {
      this.http.patchCart(body, { headers }).subscribe(res => {

        this.cartSubject.next('cart changed');
      });
    }
  }
  // clear the cart, delete every product in cart, from the database.
  async clearCart() {
    await this.http.deleteCart().toPromise();
    this.cartSubject.next('cart changed');
  }
}
