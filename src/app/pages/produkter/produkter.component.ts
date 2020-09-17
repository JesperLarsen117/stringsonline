import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-produkter',
  templateUrl: './produkter.component.html',
  styleUrls: ['./produkter.component.scss']
})
export class ProdukterComponent implements OnInit {
  brands: any;
  product: any;
  productSaved: any
  brandsRouter = this.route.snapshot.params.brands;
  productId = this.route.snapshot.params.id;
  type = this.route.snapshot.params.type
  typeTwo = this.route.snapshot.params.typeTwo
  productTypeId: any;
  brandSaved: any;
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.brands = await this.http.getBrands().toPromise();
    this.brands = this.brands.items
    this.product = await this.http.getProduct(this.productId).toPromise();
    this.productTypeId = this.product.group.id;
    this.product = this.product.group.products;
    this.productSaved = this.product
    if (this.brandsRouter) {
      this.product = await this.http.getProductByBrandId(this.productId).toPromise();
      this.product = (this.product.items) ? this.product.items : [this.product.item];
      this.brandSaved = this.product[0];
      this.product = this.product[0].products
      this.productSaved = this.product
      console.log(this.productSaved);
    }

    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.productId = this.route.snapshot.params.id;
        this.type = this.route.snapshot.params.type
        this.typeTwo = this.route.snapshot.params.typeTwo
        this.productId = this.route.snapshot.params.id;
        this.product = await this.http.getProduct(this.productId).toPromise();
        this.product = this.product.group.products;
        if (this.brandsRouter) {
          console.log(this.productId);
          this.product = await this.http.getProductByBrandId(this.productId).toPromise();
          console.log(this.product);
          this.product = (this.product.items) ? this.product.items : [this.product.item];
          this.brandSaved = this.product[0];
          console.log(this.brandSaved);
          this.product = this.product[0].products
          this.productSaved = this.product
        }
      }
    });
  }

  filterBrand(e) {
    const arr = [];
    console.log(e.target.value);

    for (const iterator of this.productSaved) {
      if (iterator.brand === e.target.value) {
        console.log('match');

        arr.push(iterator);
      }
    }
    this.product = arr;
    if (e.target.value === 'null') {
      this.product = this.productSaved;
    }
    console.log(this.product);
  }
  filterValues(e) {
    console.log(e.target.value);
    switch (e.target.value) {
      case '1':
        this.sortPrice(1);
        break;
      case '2':
        this.sortPrice(2);
        break;
      case '3':
        this.sortName(1);
        break;
      case '4':
        this.sortName(2);
        break;
    }
  }

  sortName(method) {
    console.log(method);

    if (method === 1) {
      this.product.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
    }
    if (method === 2) {
      this.product.sort((a, b) => (b.name < a.name) ? -1 : (b.name > a.name) ? 1 : 0);
    }
  }

  sortPrice(method) {
    if (method === 2) {
      this.product.sort((a, b) => (+a.price < +b.price) ? -1 : (+a.price > +b.price) ? 1 : 0);
    }
    if (method === 1) {
      this.product.sort((a, b) => (+b.price < +a.price) ? -1 : (+b.price > +a.price) ? 1 : 0);
    }
  }
}
