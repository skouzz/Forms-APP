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

  constructor(private http: HttpClient, private router: Router) {
    // Initialize currentUserSubject with data from localStorage
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserData());
  }

  // Get current user as Observable
  get currentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Get user role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Get user data from localStorage
  private getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Handle null or undefined
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
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');

    // Update currentUserSubject
    this.currentUserSubject.next(null);

    // Redirect to login page
    this.router.navigate(['/login']);
  }

  // Save user data after login/signup
  private saveUser(user: any): void {
    // Save token, role, and user data to localStorage
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('user', JSON.stringify(user));

    // Update currentUserSubject
    this.currentUserSubject.next(user);
  }
}
