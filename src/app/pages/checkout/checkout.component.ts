import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('bankPayment') bankPayment;
  @ViewChild('cardPayment') cardPayment;
  @ViewChild('otherShippingAddress') otherShippingAddress;
  alternativeShipping: boolean = false;
  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) { }
  order = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    street: ['', Validators.required],
    zipcode: ['', Validators.required],
    city: ['', Validators.required],

    otherfirstname: [''],
    otherlastname: [''],
    otherstreet: [''],
    otherzipcode: [''],
    othercity: [''],

    otherOrderAddress: [''],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    paymentOption: [''],
    otherShippingaddress: [false],

    payment: [''],

    cardNumber: [''],
    month: [''],
    year: [''],
    ctr: [''],
    cardHolderName: ['']

  });
  ngOnInit(): void {
  }
  displayDiv(e) {
    console.log(e.currentTarget.parentNode.id[0] === 'checkBank');
    if (e.currentTarget.parentNode.id === 'checkBank') {
      this.bankPayment.nativeElement.classList.add('open')
      this.cardPayment.nativeElement.classList.remove('open')
      this.bankPayment.nativeElement.parentNode.childNodes[0].childNodes[0].checked = true;
      this.cardPayment.nativeElement.parentNode.childNodes[0].childNodes[0].checked = false;
    }
    if (e.currentTarget.parentNode.id === 'checkCard') {
      this.cardPayment.nativeElement.classList.add('open')
      this.bankPayment.nativeElement.classList.remove('open')
      this.cardPayment.nativeElement.parentNode.childNodes[0].childNodes[0].checked = true;
      this.bankPayment.nativeElement.parentNode.childNodes[0].childNodes[0].checked = false;
    }
  }
  onSubmit() {
    const body = {
      firstname: this.order.get('firstname').value,
      lastname: this.order.get('lastname').value,
      address: this.order.get('street').value,
      zipcode: this.order.get('zipcode').value,
      city: this.order.get('city').value,
      email: this.order.get('email').value,
      status: 3,
      delivery_address: this.order.get('otherstreet').value ? this.order.get('otherstreet').value : "",
      delivery_zipcode: this.order.get('otherzipcode').value ? this.order.get('otherzipcode').value : "",
      delivery_city: this.order.get('othercity').value ? this.order.get('othercity').value : "",
    };


    this.http.postOrder(body).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.router.navigateByUrl(`/ordrebekræftelse/${res.order_id}`)
      }
    });
  }
  otherAddress(e) {
    this.alternativeShipping = e.currentTarget.childNodes[0].checked;

    console.log(this.order.get('otherShippingaddress').value);
    if (e.currentTarget.childNodes[0].checked) {
      this.otherShippingAddress.nativeElement.style.display = "block";
    } else {
      this.otherShippingAddress.nativeElement.style.display = "none";
    }
  }
  get f() { return this.order.controls; }
}
