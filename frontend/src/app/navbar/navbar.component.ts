import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../sidebar/sidebar.service';
import { ThemeService } from '../theme.service';
import { AuthService } from '../auth/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
  roles: string[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userRole: string = '';
  allMenuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '/dashboard', roles: ['Admin', 'User'] },
    { label: 'Forms', icon: 'pi pi-file', routerLink: '/forms', roles: ['Admin', 'User'] },
    { label: 'Users', icon: 'pi pi-users', routerLink: '/users', roles: ['Admin'] },
    { label: 'Access', icon: 'pi pi-lock', routerLink: '/access', roles: ['Admin'] },
  ];
  filteredMenuItems: MenuItem[] = [];

  isProfileMenuOpen = false;

  constructor(
    private sidebarService: SidebarService,
    public themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.role.subscribe(role => {
      console.log('Navbar Role:', role);
      this.userRole = role || '';
      this.updateMenuItems();
    });

    this.userRole = this.authService.getRole() || '';
    console.log('Navbar Initial Role:', this.userRole);
    this.updateMenuItems();
  }

  private updateMenuItems(): void {
    if (!this.userRole) {
      this.filteredMenuItems = [];
      console.log('Navbar: No role set, hiding menu');
    } else {
      this.filteredMenuItems = this.allMenuItems.filter(item =>
        item.roles.includes(this.userRole)
      );
      console.log('Navbar Filtered Menu Items:', this.filteredMenuItems);
    }
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.isProfileMenuOpen = false;
      this.authService.logout();
    }
  }

  onNotificationClick(): void {
    console.log('Notification clicked');
  }

  onAnnouncementClick(): void {
    console.log('Announcement clicked');
  }

  get isOverlayActive(): boolean {
    return this.isProfileMenuOpen || this.sidebarService.isExpanded;
  }

  toggleSidebarIfExpanded(): void {
    if (this.sidebarService.isExpanded) {
      this.sidebarService.toggleSidebar();
    }
  }
}
