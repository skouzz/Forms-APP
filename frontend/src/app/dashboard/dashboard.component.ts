import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // Import AuthService
import { SidebarComponent } from '../sidebar/sidebar.component'; // Import SidebarComponent

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent], // Add SidebarComponent to imports
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userRole: string | null = null;

  constructor(private router: Router, private authService: AuthService) {} // Inject AuthService

  ngOnInit(): void {
    // Get the role from localStorage
    this.userRole = localStorage.getItem('role');

    // If no role is found, redirect to login
    if (!this.userRole) {
      this.router.navigate(['/login']);
    }
  }

  // Admin-specific actions
  manageUsers(): void {
    this.router.navigate(['/dashboard/manage-users']);
  }

  viewReports(): void {
    this.router.navigate(['/dashboard/reports']);
  }

  // User-specific actions
  viewTasks(): void {
    this.router.navigate(['/dashboard/tasks']);
  }

  submitReport(): void {
    this.router.navigate(['/dashboard/submit-report']);
  }

  // Logout
  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
