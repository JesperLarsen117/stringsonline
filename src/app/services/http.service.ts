import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
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

  constructor(private http: HttpClient, private cookie: CookieService) { }
  // Caching products.
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
  getProduct(id) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/productgroups/${id}`);
  }
  getProductDetails(id) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/products/${id}`);
  }
  // ///////////////////////
  // Shopping cart.
  // ///////////////////////
  postCart(body: object, header) {
    return this.http.post('https://api.mediehuset.net/stringsonline/cart', body, header);
  }
  patchCart(body: object, header) {
    return this.http.patch('https://api.mediehuset.net/stringsonline/cart', body, header);
  }
  getCart(header) {
    return this.http.get('https://api.mediehuset.net/stringsonline/cart', header);
  }
  deleteItemFromCart(id) {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    return this.http.delete(`https://api.mediehuset.net/stringsonline/cart/${id}`, { headers })
  }
  deleteCart() {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.cookie.get("token")}`
    );
    return this.http.delete('https://api.mediehuset.net/stringsonline/cart', { headers });
  }
}
