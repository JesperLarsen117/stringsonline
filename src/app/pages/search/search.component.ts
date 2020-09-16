import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: any;
  id: string;
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params.id;
    this.search = await this.http.getSearch(this.id).toPromise();
    this.search = (this.search) ? this.search.items : ""
    console.log(this.search);
    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.id = this.route.snapshot.params.id;
        this.search = await this.http.getSearch(this.id).toPromise();
        this.search = (this.search) ? this.search.items : ""
        console.log(this.search);
      }
    })
  }
}
