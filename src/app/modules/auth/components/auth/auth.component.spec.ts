import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthComponent', () => {

  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let main: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    main = fixture.nativeElement.querySelector('main');
  });

  afterEach(() => {
    main = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have main tag wrapping router outlet', () => {
    expect(main).toBeTruthy();
  });
});
