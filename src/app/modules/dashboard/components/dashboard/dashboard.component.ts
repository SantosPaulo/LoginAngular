import { Component, OnInit } from '@angular/core';
import { User } from '@app/core/models/user';
import { AuthService } from '@app/modules/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(
    private readonly authService: AuthService
  ) {
    this.authService.userCast.subscribe(
      user => this.user = user
    );
  }

  ngOnInit() {}

  logout(): void {
    this.authService.logout();
  }
}
