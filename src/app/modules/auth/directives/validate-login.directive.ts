import { Directive } from '@angular/core';
import { SigninComponent } from '../components/signin/signin.component';
import { Validators } from '@angular/forms';

@Directive({
  selector: 'form[validate-login]'
})
export class ValidateLoginDirective {

  constructor(
    public readonly host: SigninComponent
  ) {
    const form = this.host.signupForm;
    
    form.get('email').setValidators([
      Validators.required,
      Validators.email
    ]);

    form.get('password').setValidators([
      Validators.required,
      Validators.minLength(6)
    ]);
  }
}
