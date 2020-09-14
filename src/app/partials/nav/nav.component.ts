import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private fb: FormBuilder, public auth: AuthService) { }
  search = this.fb.group(
    {
      search: ['']
    });
  ngOnInit(): void {
  }

}
