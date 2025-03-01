import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (route.data['role'] && route.data['role'] !== user.role) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
