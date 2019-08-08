import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SigninComponent, data: { animation: 'right' } },
      { path: 'signup', component: SignupComponent, data: { animation: 'left' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
