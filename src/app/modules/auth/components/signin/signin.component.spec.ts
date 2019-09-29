import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin.component';
import { SharedModule } from '@app/modules/shared/shared.module';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location, DOCUMENT } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent, DashboardComponent } from './signin.mock';

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
  let document: Document;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SigninComponent,
        SignupComponent,
        DashboardComponent
      ],
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

  it('validate email validity', () => {
    const email = component.signupForm.get('email');
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();
  });

  it('validate password validity', () => {
    const password = component.signupForm.get('password');
    expect(password.valid).toBeFalsy();
    expect(password.errors['required']).toBeTruthy();
    password.setValue('12345');
    expect(password.errors['minlength']).toBeTruthy();
  });

  it('should navigate to dashboard page after click submit', fakeAsync(() => {
    const email = component.signupForm.get('email');
    const password = component.signupForm.get('password');
    email.setValue('test@gmail.com');
    password.setValue('1234567');
    component.signupForm.updateValueAndValidity();

    if (component.signupForm.valid) {
      router.navigate(['/dashboard']);
    }
    tick();
    expect(location.path()).toBe('/dashboard');
  }));
});
