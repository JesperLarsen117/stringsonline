import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  totalNumberOfItems: any;
  totalItems: any = 0;
  @ViewChild('quantity') quantity;
  constructor(private fb: FormBuilder, private cookie: CookieService, public auth: AuthService, private cart: CartService, private http: HttpService, private router: Router) { }
  search = this.fb.group({
    search: ['']
  });
  async ngOnInit(): Promise<void> {
    if (this.auth.isOnline) {

      const headers = new HttpHeaders().set(
        "Authorization",
        `Bearer ${this.cookie.get("token")}`
      );
      this.totalNumberOfItems = await this.http.getCart({ headers }).toPromise();
      this.totalNumberOfItems = this.totalNumberOfItems.cartlines;
      this.totalNumberOfItems = this.totalNumberOfItems ? this.totalNumberOfItems : [{ quantity: 0 }]
      for (const item of this.totalNumberOfItems) {
        this.totalItems = (item.quantity) ? +this.totalItems + +item.quantity : 0
      }
      // updates everytime, something new happends with the shopping cart.
      this.cart.cartSubject.subscribe(async status => {
        this.quantity.nativeElement.classList.add('wriggle');
        setTimeout(() => {
          this.quantity.nativeElement.classList.remove('wriggle');
        }, 200);
        let amount = 0;
        this.totalNumberOfItems = await this.http.getCart({ headers }).toPromise();
        this.totalNumberOfItems = this.totalNumberOfItems.cartlines;

        if (this.totalNumberOfItems) {
          for (const item of this.totalNumberOfItems) {
            amount = (item.quantity) ? amount + +item.quantity : 0
          }
          this.totalItems = amount
        } else {
          this.totalItems = 0
        }
      })
    }
  }
  onSubmit() {
    this.router.navigateByUrl(`/søg/${this.search.get('search').value}`)
  }
  openMenu(e) {
    e.currentTarget.parentNode.childNodes[1].classList = 'open'
    console.dir(e.currentTarget.parentNode.childNodes[1]);
  }
  closeMenu(e) {
    e.currentTarget.parentNode.parentNode.childNodes[1].classList = ''
    console.dir(e.currentTarget.parentNode.childNodes[1]);
  }
}
