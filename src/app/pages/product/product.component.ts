import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('thisValue') thisValue;
  @ViewChild('ratingBox') ratingBox;
  product: any;
  productId = this.route.snapshot.params.id;
  type = this.route.snapshot.params.type
  typeTwo = this.route.snapshot.params.typeTwo
  productTypeId = this.route.snapshot.params.typeId;
  cartFrom = this.fb.group({
    quantity: [1]
  })
  amount: any;
  averageRating: any;
  constructor(public auth: AuthService, private elem: ElementRef, private http: HttpService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cart: CartService) { }

  async ngOnInit(): Promise<void> {
    this.product = await this.http.getProductDetails(this.productId).toPromise();
    this.product = this.product.item;
    this.averageRating = await this.http.getAverageRating(this.product.id).toPromise();
    this.averageRating = (parseFloat(this.averageRating.average_num_stars)) ? parseFloat(this.averageRating.average_num_stars) * 20 : 0;

    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.productId = this.route.snapshot.params.id;
        this.product = await this.http.getProductDetails(this.productId).toPromise();
        this.product = this.product.item;
      }
    });

    this.http.ratingSubject.subscribe(status => {
      setTimeout(async () => {
        this.averageRating = await this.http.getAverageRating(this.product.id).toPromise();
        this.averageRating = (parseFloat(this.averageRating.average_num_stars)) ? parseFloat(this.averageRating.average_num_stars) * 20 : 0;
      }, 200);
    })
  }

  async onSubmit(id, stock) {
    let quantity = this.cartFrom.get('quantity').value;
    if (quantity >= stock) {
      await this.cart.addToCart(id, stock);
    } else {
      await this.cart.addToCart(id, quantity);
    }
  }
  value() {
    this.amount = this.cartFrom.get('quantity').value;
  }
  // open the rating tab.
  openRating() {
    const element = this.elem.nativeElement.querySelector('.rating-box');
    element.classList.toggle('open')
  }
}
