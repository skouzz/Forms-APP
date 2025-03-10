import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject: BehaviorSubject<any>;
  private roleSubject: BehaviorSubject<string | null>; // New role subject

  constructor(private http: HttpClient, private router: Router) {
    // Initialize currentUserSubject with data from localStorage
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserData());
    // Initialize roleSubject with the role from localStorage or null
    this.roleSubject = new BehaviorSubject<string | null>(this.getRole());
  }

  // Get current user as Observable
  get currentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Get role as Observable
  get role(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  // Get user role (synchronous method)
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Get user data from localStorage
  private getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Signup
  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data).pipe(
      map((user) => {
        this.saveUser(user);
        return user;
      })
    );
  }

  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      map((response: any) => {
        this.saveUser(response);
        return response;
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.roleSubject.next(null); // Update roleSubject on logout
    this.router.navigate(['/login']);
  }

  // Save user data after login/signup
  private saveUser(user: any): void {
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.roleSubject.next(user.role); // Update roleSubject with the new role
  }
}
