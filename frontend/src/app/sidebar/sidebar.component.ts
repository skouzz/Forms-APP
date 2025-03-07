import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, SidebarModule, ButtonModule, MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  visible = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '/dashboard' },
    { label: 'Settings', icon: 'pi pi-cog', routerLink: '/settings' },
    { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'Support', icon: 'pi pi-question', routerLink: '/support' },
  ];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((visible) => {
      this.visible = visible;
    });
  }

  signOut(): void {
    // Add sign-out logic here (e.g., clear auth, redirect)
    console.log('Sign out clicked');
  }
}
