import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  id = this.route.snapshot.params.id;
  order: any;
  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.http.getOrderById(this.id).subscribe((res: any) => {
      this.order = res.order;
      console.log(this.order);

    })
  }

}
