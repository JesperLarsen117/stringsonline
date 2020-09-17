import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token: Object;
  couldLogin: boolean = true;
  constructor(private fb: FormBuilder, public auth: AuthService, private cookie: CookieService, private router: Router) { }

  login = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.auth.isOnline) this.router.navigateByUrl('/forside')
  }
  async onSubmit() {
    const body = {
      username: this.login.get('username').value,
      password: this.login.get('password').value
    }
    await this.auth.login(body).subscribe(res => res);
  }

  get f() { return this.login.controls; }

}
