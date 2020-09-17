import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  rating = this.fb.group({
    rating: []
  });
  @Input('pid') pid;
  constructor(private http: HttpService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  postRate(id) {
    setTimeout(() => {
      const body = {
        product_id: id,
        num_stars: this.rating.get('rating').value
      }
      if (this.rating.get('rating').value > 0) {
        this.http.postRating(body).subscribe(res => {
          console.log(res);
        })
      } else {
        this.http.deleteRating(id).subscribe(res => {
          console.log(res);
        })
      }
    }, 200);
  }
}
