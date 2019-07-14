import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignoutComponent } from './components/signout/signout.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [SignoutComponent, SigninComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
