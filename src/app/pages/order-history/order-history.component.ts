import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any;
  constructor(private http: HttpService) { }

  async ngOnInit(): Promise<void> {
    this.orderHistory = await this.http.getOrderHistory().toPromise();
    this.orderHistory = this.orderHistory.items
    console.log(this.orderHistory);

  }
  unixTimestampToDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('da-dk', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
