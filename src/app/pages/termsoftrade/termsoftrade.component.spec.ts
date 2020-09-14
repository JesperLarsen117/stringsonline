import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsoftradeComponent } from './termsoftrade.component';

describe('TermsoftradeComponent', () => {
  let component: TermsoftradeComponent;
  let fixture: ComponentFixture<TermsoftradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsoftradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsoftradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
