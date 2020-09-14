import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }
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
  getProduct(id) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/productgroups/${id}`);
  }
  getProductDetails(id) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/products/${id}`);
  }
}
