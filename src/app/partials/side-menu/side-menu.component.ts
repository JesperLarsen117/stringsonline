import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  products: any;
  constructor(private http: HttpService) { }

  async ngOnInit(): Promise<void> {
    this.products = await this.http.getProducts().toPromise();
    this.products = this.products.productgroups.items
    console.log(this.products);

  }

}
