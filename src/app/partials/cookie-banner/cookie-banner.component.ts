import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
  }
  accept() {
    this.cookie.set('cookieAccept', 'yes')
  }
}
