import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('image') image;
  @Input('title') title;
  @Input('teaser') teaser;
  @Input('price') price;
  @Input('stock') stock;
  @Input('id') id;
  @Input('url') url;
  constructor(public cart: CartService, public auth: AuthService) { }

  ngOnInit(): void {
  }

}
