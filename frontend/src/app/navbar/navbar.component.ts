import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MenubarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Products', icon: 'pi pi-box', routerLink: '/products' },
    { label: 'Pricing', icon: 'pi pi-dollar', routerLink: '/pricing' },
    { label: 'About', icon: 'pi pi-info-circle', routerLink: '/about' },
  ];

  isDarkMode = false;

  constructor(private sidebarService: SidebarService) {}

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = this.isDarkMode
        ? 'node_modules/primeng/themes/lara/dark/indigo/theme.css'
        : 'node_modules/primeng/themes/lara/light/indigo/theme.css';
    }
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
