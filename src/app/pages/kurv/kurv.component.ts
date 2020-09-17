import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

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
  constructor(public cart: CartService, private http: HttpService, private renderer: Renderer2, private elem: ElementRef, private auth: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.itemsInCart = await this.cart.get().toPromise();
    this.itemsInCart = this.itemsInCart.cartlines;
    let totalMoneyAmount: number | string = 0
    if (this.itemsInCart) {
      for (const itemInCart of this.itemsInCart) {
        this.products = await this.http.getProductDetails(itemInCart.product_id).toPromise();
        this.products = this.products.item
        const withQuantity = +this.products.price * +itemInCart.quantity
        totalMoneyAmount = totalMoneyAmount + withQuantity;
        this.product.push({
          name: this.products.name,
          image: this.products.image.fullpath,
          price: this.products.price,
          stock: this.products.stock,
          id: itemInCart.id,
          pid: this.products.id,
          quantity: itemInCart.quantity,
        });
      }
      console.log(this.product);

      this.totalPrice = totalMoneyAmount
    }
    this.cart.cartSubject.subscribe(async status => {
      this.itemsInCart = await this.cart.get().toPromise();
      this.itemsInCart = this.itemsInCart.cartlines;
      let totalMoneyAmount: number | string = 0
      if (this.itemsInCart) {
        for (const [index, itemInCart] of this.itemsInCart.entries()) {
          this.products = await this.http.getProductDetails(itemInCart.product_id).toPromise();
          this.products = this.products.item
          const withQuantity = +this.products.price * +itemInCart.quantity
          totalMoneyAmount = totalMoneyAmount + withQuantity;
          if (this.product[index]) {
            if (itemInCart.quantity !== this.product[index].quantity) {
              this.product[index].quantity = itemInCart.quantity
            }
          }
        }
        this.totalPrice = totalMoneyAmount
      } else {
        this.totalPrice = 0;
      }
    });
  }
  clearCart() {
    this.totalPrice = 0;
    const elements = this.elem.nativeElement.querySelectorAll('.cartCard');
    for (const iterator of elements) {
      iterator.remove();
    }
    this.cart.clearCart();
  }
}


