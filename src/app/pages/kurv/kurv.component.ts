import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-kurv',
  templateUrl: './kurv.component.html',
  styleUrls: ['./kurv.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class KurvComponent implements OnInit {
  itemsInCart: any;
  products: any;
  product: any = [];
  totalPrice: number | string = 0;
  constructor(public cart: CartService, private http: HttpService, private renderer: Renderer2, private elem: ElementRef) { }

  async ngOnInit(): Promise<void> {

    this.itemsInCart = await this.cart.get().toPromise();
    this.itemsInCart = this.itemsInCart.cartlines;
    if (this.itemsInCart) {
      for (const itemInCart of this.itemsInCart) {
        this.products = await this.http.getProductDetails(itemInCart.product_id).toPromise();
        this.products = this.products.item
        this.totalPrice = parseFloat(this.totalPrice + this.products.price).toFixed(2);
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
  clearCart() {
    this.totalPrice = 0
    console.log(this.totalPrice);

    const elements = this.elem.nativeElement.querySelectorAll('.cartCard');
    for (const iterator of elements) {
      iterator.remove();
    }
    this.cart.clearCart();
  }
}


