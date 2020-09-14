import { Component, Input, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    console.log(this.url);

  }

}
