import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // 🚫 Check if the user is not authenticated (no token)
    if (!token) {
      this.redirectToLogin(state.url); // Redirect to login with the attempted URL
      return false;
    }

    // 🔒 Check if the route requires a specific role and the user doesn't have it
    const requiredRole = route.data['role'];
    if (requiredRole && userRole !== requiredRole) {
      this.redirectToLogin(state.url); // Redirect to login with the attempted URL
      return false;
    }

    return true; // Allow access
  }

  /**
   * Redirects the user to the login page with a redirect URL.
   * @param attemptedUrl The URL the user attempted to access.
   */
  private redirectToLogin(attemptedUrl: string): void {
    this.router.navigate(['/login'], { queryParams: { redirectUrl: attemptedUrl } });
  }
}
