import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  products: Observable<any>;
  userSubject = new Subject();
  ratingSubject = new Subject();

  constructor(private http: HttpClient, private cookie: CookieService, private auth: AuthService) { }
  // Caching all products.
  get products$(): Observable<any> {
    if (!this.products) {
      this.products = this.http.get(('https://api.mediehuset.net/stringsonline/')).pipe(
        map((data: any) => data.productgroups.items),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.products;
  }

  // ///////////////////////
  // Products.
  // ///////////////////////
  // get product by id.
  getProduct(id) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/productgroups/${id}`);
  }
  // get product details by id.
  getProductDetails(id) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/products/${id}`);
  }
  // ///////////////////////
  // Shopping cart.
  // ///////////////////////
  // post to shopping cart.
  postCart(body: object, header) {
    return this.http.post('https://api.mediehuset.net/stringsonline/cart', body, header);
  }
  // patch cart.
  patchCart(body: object, header) {
    return this.http.patch('https://api.mediehuset.net/stringsonline/cart', body, header);

  }
  // get everyting in cart.
  getCart(header) {
    return this.http.get('https://api.mediehuset.net/stringsonline/cart', header);

  }
  // delete item from cart, with id.
  deleteItemFromCart(id) {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    return this.http.delete(`https://api.mediehuset.net/stringsonline/cart/${id}`, { headers })

  }
  // delete everying in cart.
  deleteCart() {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    return this.http.delete('https://api.mediehuset.net/stringsonline/cart', { headers });
  }
  // ///////////////////////
  // order
  // ///////////////////////
  // post order.
  postOrder(body) {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    return this.http.post(`https://api.mediehuset.net/stringsonline/orders`, body, { headers })
  }
  // get order by id.
  getOrderById(id: string | number) {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    return this.http.get(`https://api.mediehuset.net/stringsonline/orders/${id}`, { headers })
  }
  // get every order.
  getOrderHistory() {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    return this.http.get('https://api.mediehuset.net/stringsonline/orders', { headers });
  }

  // ///////////////////////
  // search
  // ///////////////////////
  // get products, with keyword.
  getSearch(keyword) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/search/${keyword}`);
  }

  // ///////////////////////
  // brand
  // ///////////////////////
  // get all brands.
  getBrands() {
    return this.http.get('https://api.mediehuset.net/stringsonline/brands');
  }
  getProductByBrandId(id) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/brands/${id}`);
  }
  // ///////////////////////
  // rating
  // ///////////////////////
  // get average rating. with id.
  getAverageRating(id) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/ratings/average/${id}`);
  }
  // post rating.
  postRating(body) {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    this.ratingSubject.next('rating changed');
    return this.http.post('https://api.mediehuset.net/stringsonline/ratings', body, { headers })
  }
  // delete rating.
  deleteRating(id) {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    this.ratingSubject.next('rating changed');
    return this.http.delete(`https://api.mediehuset.net/stringsonline/ratings/${id}`, { headers })
  }
}
