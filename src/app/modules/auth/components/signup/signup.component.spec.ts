import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { SharedModule } from '@app/modules/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: '',
  template: ''
})
class LoginComponent {}

const routes: Routes = [
  { path: '', component: LoginComponent }
];

describe('SignupComponent', () => {

  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let nativeElement: HTMLElement;
  let pageTitle: HTMLElement;
  let button: HTMLButtonElement;
  let nameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let anchor: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(routes)
      ],
      declarations: [
        SignupComponent,
        LoginComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    pageTitle = nativeElement.querySelector('h2');
    nameInput = nativeElement.querySelector('input[type="text"');
    emailInput = nativeElement.querySelector('input[type="email"');
    passwordInput = nativeElement.querySelector('input[type="password"');
    button = nativeElement.querySelector('button[type="button"');
    anchor = nativeElement.querySelector('p small a');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct page title', () => {
    expect(pageTitle.innerText).toBe('Signup');
  });

  it('should have name input', () => {
    expect(nameInput).toBeTruthy();
    expect(nameInput.placeholder).toBe('Name');
  });

  it('should have email input', () => {
    expect(emailInput).toBeTruthy();
    expect(emailInput.placeholder).toBe('Email');
  });

  it('should have password input', () => {
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.placeholder).toBe('Password');
  });

  it('should have submit button', () => {
    expect(button).toBeTruthy();
    expect(button.innerText).toBe('signup');
  });

  it('should have link to signin', () => {
    expect(anchor).toBeTruthy();
    expect(anchor.innerText).toBe('signin');
    expect(anchor.getAttribute('routerLink')).toBe('/auth/signin');
  });
});
