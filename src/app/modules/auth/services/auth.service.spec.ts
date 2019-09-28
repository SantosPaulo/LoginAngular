import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-signin',
  template: ''
})
class LoginComponent {}

@Component({
  selector: 'app-dashboard',
  template: ''
})
class DashboardComponent {}

const routes: Routes = [
  { path: '', component: LoginComponent }
];

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      LoginComponent,
      DashboardComponent
    ],
    imports: [
      HttpClientModule,
      RouterModule.forRoot(routes),
      MatDialogModule
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
