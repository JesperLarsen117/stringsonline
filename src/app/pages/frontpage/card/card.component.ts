import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'card-frontpage',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('title') title;
  @Input('image') image;
  @Input('teaser') teaser;
  @Input('price') price;
  @Input('id') id;
  constructor(public cart: CartService, public auth: AuthService) { }

  ngOnInit(): void {
  }

}
