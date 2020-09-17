import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  brands: any;
  constructor(public http: HttpService) { }
  async ngOnInit() {
    if (!this.brands) {
      this.brands = await this.http.getBrands().toPromise();
      this.brands = this.brands.items;

    }
  }
}
