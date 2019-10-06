import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Base } from '@app/classes/base';
import { AlertService } from '@app/core/services/alert-service';
import { Jwt } from '@app/core/models/jwt';

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
          .signup(this.signupForm.value)
          .subscribe((jwt: Jwt) => {

            let message;

            if (jwt) {
              this.authService.setSession(jwt);
              message = 'Signup succefully.';
            } else {
              message = jwt.message;
            }
            this.alertService.openSnackBar(message);
          })
    );
  }

  private _initForm(): void {
    this.signupForm = this.fb.group({
      name: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
      email: new FormControl('', [ Validators.email, Validators.required ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
    });
  }
}
