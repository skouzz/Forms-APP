import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any, state: RouterStateSnapshot): boolean {
    // Check if the user is authenticated
    if (this.authService.isAuthenticated()) {
      // Redirect to dashboard (or another default route) if authenticated
      this.router.navigate(['/dashboard'], { queryParams: { redirectUrl: state.url } });
      return false; // Deny access to public routes
    }

    return true; // Allow access to public routes
  }
}
