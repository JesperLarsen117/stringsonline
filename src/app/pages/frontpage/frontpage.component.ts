import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent implements OnInit {

  constructor(private http: HttpService) { }
  allProducts: any;
  product: any = [];
  async ngOnInit(): Promise<void> {
    this.allProducts = await this.http.products$.toPromise();
    // this.allProducts = [...this.allProducts]
    for (const Allitems of this.allProducts) {
      for (const items of Allitems.subgroups) {
        if (items.products) {
          this.product.push(...items.products);
        }
      }
    }
    this.product.sort((a, b) => (+b.rating < +a.rating) ? -1 : (+b.rating > +a.rating) ? 1 : 0);
    this.product = this.product.slice(0, 4)
    console.log(this.product);

  }

}
