import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { SharedModule } from '@app/modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent, SigninComponent } from './signup.mock';
import { Router } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';

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
  let location: Location;
  let router: Router;
  let document: Document;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'auth/signin', component: SigninComponent },
          { path: 'auth/signup', component: SignupComponent },
          { path: 'dashboard', component: DashboardComponent }
        ])
      ],
      declarations: [
        SigninComponent,
        SignupComponent,
        DashboardComponent
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
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
    document = TestBed.get(DOCUMENT);
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

  it('should navigate to signin page', fakeAsync(() => {
    router.navigate(['/auth/signup']);
    tick();
    expect(location.path()).toBe('/auth/signup');
    anchor.click()
    tick();
    expect(location.path()).toBe('/auth/signin');
  }));

  it('validate name validity', () => {
    const email = component.signupForm.get('email');
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();
  });

  it('validate email validity', () => {
    const name = component.signupForm.get('name');
    expect(name.valid).toBeFalsy();
    expect(name.errors['required']).toBeTruthy();

    name.setValue('Pa');
    component.signupForm.updateValueAndValidity();
    expect(name.errors['minlength']).toBeTruthy();
  });

  it('validate password validity', () => {
    const password = component.signupForm.get('password');
    expect(password.valid).toBeFalsy();
    expect(password.errors['required']).toBeTruthy();
    password.setValue('12345');
    expect(password.errors['minlength']).toBeTruthy();
  });

  it('should navigate to dashboard page after click submit', fakeAsync(() => {

    const name = component.signupForm.get('name');
    const email = component.signupForm.get('email');
    const password = component.signupForm.get('password');

    name.setValue('Paulo Santos');
    email.setValue('test@gmail.com');
    password.setValue('1234567');
    component.signupForm.updateValueAndValidity();

    if (component.signupForm.valid) {
      router.navigate(['/dashboard']);
    }
    tick();
    expect(location.path()).toBe('/dashboard');
  }));

  it('shouldn\'t submit form if it is valid', () => {
    const name = component.signupForm.get('name');
    const email = component.signupForm.get('email');
    const password = component.signupForm.get('password');
    name.setValue('Pa');
    email.setValue('testgmail.com');
    password.setValue('123');
    component.signupForm.updateValueAndValidity();
    button.click();
    expect(name.valid).toBeFalsy();
    expect(name.errors['minlength']).toBeTruthy();
    expect(email.valid).toBeFalsy();
    expect(email.errors['email']).toBeTruthy();
    expect(password.errors['minlength']).toBeTruthy();
  });
});
