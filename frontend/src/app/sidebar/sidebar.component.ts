import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';
import { AuthService } from '../auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface SubMenuItem {
  label: string;
  routerLink: string;
}

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
  roles: string[];
  subItems?: SubMenuItem[];
  expanded: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sidebarAnimation', [
      state('collapsed', style({ width: '60px' })),
      state('expanded', style({ width: '18rem' })),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
    trigger('subMenuAnimation', [
      state('closed', style({ height: '0', opacity: '0', overflow: 'hidden' })),
      state('open', style({ height: '*', opacity: '1' })),
      transition('closed <=> open', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  visible = false;
  userRole: string = 'user';
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      routerLink: '/dashboard',
      roles: ['admin', 'user'],
      subItems: [
        { label: 'Overview', routerLink: '/dashboard/overview' },
        { label: 'Reports', routerLink: '/dashboard/reports' },
      ],
      expanded: false,
    },
    {
      label: 'Forms',
      icon: 'pi pi-file',
      routerLink: '/forms',
      roles: ['admin', 'user'],
      subItems: [
        { label: 'Create Form', routerLink: '/forms/create' },
        { label: 'View Forms', routerLink: '/forms/list' },
      ],
      expanded: false,
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: '/users',
      roles: ['admin'],
      subItems: [
        { label: 'Manage Users', routerLink: '/users/manage' },
        { label: 'User Roles', routerLink: '/users/roles' },
      ],
      expanded: false,
    },
    {
      label: 'Access',
      icon: 'pi pi-lock',
      routerLink: '/access',
      roles: ['admin'],
      subItems: [
        { label: 'Permissions', routerLink: '/access/permissions' },
        { label: 'Settings', routerLink: '/access/settings' },
      ],
      expanded: false,
    },
  ];

  filteredMenuItems: MenuItem[] = [];

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((visible) => {
      console.log('Sidebar visibility changed to:', visible);
      this.visible = visible;
    });
    const role = this.authService.getRole();
    this.userRole = role || 'user';
    this.filterMenuItems();
  }

  filterMenuItems(): void {
    this.filteredMenuItems = this.menuItems.filter(item =>
      item.roles.includes(this.userRole)
    );
    console.log('Filtered menu items:', this.filteredMenuItems);
  }

  toggleSubMenu(item: MenuItem, event: Event): void {
    event.stopPropagation();
    console.log('Toggle clicked:', item.label, 'Visible before:', this.visible, 'Expanded before:', item.expanded);
    // Open sidebar if not already visible, then toggle sub-menu
    if (!this.visible) {
      this.sidebarService.setSidebarVisible(true);
      this.visible = true; // Sync local state immediately
    }
    item.expanded = !item.expanded;
    console.log('Visible after:', this.visible, 'Expanded after:', item.expanded);
  }

  onMenuItemClick(event: Event): void {
    event.stopPropagation();
    console.log('Sub-menu item clicked');
    this.sidebarService.setSidebarVisible(true); // Keep sidebar open
  }

  onSidebarClick(event: Event): void {
    event.stopPropagation();
    console.log('Sidebar clicked, keeping open');
    this.sidebarService.setSidebarVisible(true);
  }

  confirmLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.sidebarService.setSidebarVisible(false); // Close on logout
    }
  }
}
