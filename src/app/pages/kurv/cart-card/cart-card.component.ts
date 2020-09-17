import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {
  @Input('image') image;
  @Input('title') title;
  @Input('quantity') quantity;
  @Input('price') price;
  @Input('stock') stock;
  @Input('id') id;
  @Input('pid') pid;
  constructor(public cart: CartService) { }

  ngOnInit(): void {

  }

}
