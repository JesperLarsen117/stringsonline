import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  products: Observable<any>;
  constructor(private http: HttpClient) { }

  get products$(): Observable<any> {
    if (!this.products) {
      this.products = this.http.get(('https://api.mediehuset.net/stringsonline/')).pipe(
        map((data: any) => data.productgroups.items),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.products;
  }

}
