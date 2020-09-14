import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-produkter',
  templateUrl: './produkter.component.html',
  styleUrls: ['./produkter.component.scss']
})
export class ProdukterComponent implements OnInit {
  product: any;
  productId = this.route.snapshot.params.id;
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.product = await this.http.getProduct(this.productId).toPromise();
    this.product = this.product.group.products;
    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.productId = this.route.snapshot.params.id;
        this.product = await this.http.getProduct(this.productId).toPromise();
        this.product = this.product.group.products;
      }
    });
  }
}
