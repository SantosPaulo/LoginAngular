import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { ValidateLoginDirective } from './directives/validate-login.directive';
import { ValidateSigninDirective } from './directives/validate-signin.directive';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ValidateLoginDirective,
    ValidateSigninDirective,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
