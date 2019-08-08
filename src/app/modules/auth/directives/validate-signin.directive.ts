import { Directive } from '@angular/core';
import { Validators } from '@angular/forms';
import { SignupComponent } from '../components/signup/signup.component';
import { environment as env } from '@env/environment';

@Directive({
  selector: 'form[validate-signup]'
})
export class ValidateSigninDirective {

  constructor(
    public readonly host: SignupComponent
  ) {
    const form = this.host.signupForm;

    form.get('name').setValidators([
      Validators.required,
    ]);
    
    form.get('email').setValidators([
      Validators.required,
      Validators.email
    ]);

    form.get('password').setValidators([
      Validators.required,
      Validators.minLength(env.password_strength)
    ]);
  }
}
