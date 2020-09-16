import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<any>(this.cookie.get('token'));

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }
  // login, return token.

  public get isOnline(): boolean {
    return this.userSubject.value ? true : false;

  }

  login(body) {
    return this.http.post<User>('https://api.mediehuset.net/token', body)
      .pipe(map((user: any) => {
        this.cookie.set('token', user.access_token);
        this.userSubject.next(user);
        location.href = '/';
        return user
      }));
  }
  logout() {
    this.cookie.delete('token')
    this.userSubject.next(null);
  }
}
