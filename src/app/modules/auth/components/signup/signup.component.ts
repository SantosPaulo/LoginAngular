import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Base } from '@app/classes/base';
import { AlertService } from '@app/core/services/alert-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends Base {

  signupForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly alertService: AlertService
  ) {
    super();
    this._initForm();
  }

  submit(): void {

    if (!this.signupForm.valid) {
      this.alertService.openSnackBar('Invalid credentials.');
      return;
    }

    this.subscriptions.add(
      this.authService
          .signin(this.signupForm.value)
          .subscribe(res => {

            let message;

            if (res.token) {
              this.authService.setSession(res.token);
              message = 'Signup succefully.';
            } else {
              message = res.message;
            }
            this.alertService.openSnackBar(message);
          })
    );
  }

  private _initForm(): void {
    this.signupForm = this.fb.group({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
    });
  }
}