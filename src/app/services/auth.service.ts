import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface User {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<any>(this.cookie.get('token'));

  constructor(private http: HttpClient, private cookie: CookieService) { }
  // login, return token.

  public get isOnline(): boolean {
    if (this.userSubject.value) return true;
    if (!this.userSubject.value) return false;
  }

  login(body) {
    return this.http.post<User>('https://api.mediehuset.net/token', body)
      .pipe(map((user: any) => {
        this.cookie.set('token', user.access_token);
        this.userSubject.next(user);
      }));
  }
  logout() {
    this.cookie.delete('token')
    this.userSubject.next(null);
  }
}
