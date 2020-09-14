import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
  productId = this.route.snapshot.params.id;
  type = this.route.snapshot.params.type
  typeTwo = this.route.snapshot.params.typeTwo
  productTypeId = this.route.snapshot.params.typeId;
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.product = await this.http.getProductDetails(this.productId).toPromise();
    this.product = this.product.item;
    console.log(this.product);

    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.productId = this.route.snapshot.params.id;
        this.product = await this.http.getProductDetails(this.productId).toPromise();
        this.product = this.product.item;
      }
    });
  }

}
