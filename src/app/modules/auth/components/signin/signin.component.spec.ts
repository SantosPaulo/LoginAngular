import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin.component';
import { SharedModule } from '@app/modules/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: '',
  template: ''
})
class LoginComponent {}

const routes: Routes = [
  { path: '', component: LoginComponent }
];

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SigninComponent,
        LoginComponent
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(routes)
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
