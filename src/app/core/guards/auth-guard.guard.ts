import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  
  canActivate(): boolean {
   
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return false;
    }
    return true;
  }
}
