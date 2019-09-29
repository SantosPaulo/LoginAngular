import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin.component';
import { SharedModule } from '@app/modules/shared/shared.module';
import { Routes, Router } from '@angular/router';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: '',
  template: ''
})
class SignupComponent {}

const routes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent }
];

describe('SigninComponent', () => {

  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let nativeElement: HTMLElement;
  let pageTitle: HTMLElement;
  let button: HTMLButtonElement;
  let anchor: HTMLElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SigninComponent,
        SignupComponent
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        RouterTestingModule.withRoutes(routes)
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    pageTitle = nativeElement.querySelector('h2');
    emailInput = nativeElement.querySelector('input[type="email"');
    passwordInput = nativeElement.querySelector('input[type="password"');
    button = nativeElement.querySelector('button[type="button"');
    anchor = nativeElement.querySelector('p small a');
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  afterEach(() => {
    fixture = null;
    component = null;
    nativeElement = null;
    pageTitle = null;
    emailInput = null;
    passwordInput = null;
    button = null;
    anchor = null;
    location = null;
    router = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct page title', () => {
    expect(pageTitle.innerText).toBe('Signin');
  });

  it('should have email input', () => {
    expect(emailInput).toBeTruthy();
    expect(emailInput.placeholder).toBe('email');
  });

  it('should have password input', () => {
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.placeholder).toBe('password');
  });

  it('should have submit button', () => {
    expect(button).toBeTruthy();
    expect(button.innerText).toBe('signin');
  });

  it('should have link to signup', () => {
    expect(anchor).toBeTruthy();
    expect(anchor.innerText).toBe('signup');
    expect(anchor.getAttribute('routerLink')).toBe('/auth/signup');
  });

  it('should navigate to signup page', fakeAsync(() => {
    router.navigate(['/auth/signin']);
    tick();
    expect(location.path()).toBe('/auth/signin');
    anchor.click()
    tick();
    expect(location.path()).toBe('/auth/signup');
  }));
});
