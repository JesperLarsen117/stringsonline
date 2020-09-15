import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-kurv',
  templateUrl: './kurv.component.html',
  styleUrls: ['./kurv.component.scss']
})
export class KurvComponent implements OnInit {
  itemsInCart: any;
  products: any;
  product: any = [];
  constructor(private cart: CartService, private http: HttpService) { }

  async ngOnInit(): Promise<void> {
    let index = 0;
    this.itemsInCart = await this.cart.get().toPromise();
    this.itemsInCart = this.itemsInCart.cartlines;
    if (this.itemsInCart) {
      for (const itemInCart of this.itemsInCart) {
        this.products = await this.http.getProductDetails(itemInCart.product_id).toPromise();
        this.products = this.products.item
        this.product.push({
          name: this.products.name,
          image: this.products.image.fullpath,
          price: this.products.price,
          stock: this.products.stock,
          id: itemInCart.id,
          quantity: 1,
        });

      }
    }
  }
}


