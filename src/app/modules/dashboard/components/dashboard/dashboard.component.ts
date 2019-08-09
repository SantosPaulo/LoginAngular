import { Component, OnInit } from '@angular/core';
import { User } from '@app/core/models/user';
import { AuthService } from '@app/modules/auth/services/auth.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Base } from '@app/classes/base';
import { fadein } from '@app/core/animations/fadein.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ fadein ]
})
export class DashboardComponent extends Base implements OnInit {

  user: User;
  form: FormGroup;
  
  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    super();
    this.authService.userCast$.subscribe(
      user => this.user = user
    );
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: '',
      profilePicUrl: ''
    })
  }

  logout(): void {
    this.authService.logout();
  }

  goToOutlet(outlet: string, path: string): void {
    this.router.navigate([
      { outlets: { [outlet]: [ path ] } }
    ]);
  }
}
