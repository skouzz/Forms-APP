import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  visible: boolean = true; // Par défaut, le sidebar est ouvert
  role: string = '';
  menuItems: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.role = user?.role || '';
      this.setMenuItems();
    });
  }

  setMenuItems() {
    const adminMenu = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/admin/dashboard' },
      { label: 'Gérer Utilisateurs', icon: 'pi pi-users', routerLink: '/admin/users' },
      { label: 'Paramètres', icon: 'pi pi-cog', routerLink: '/admin/settings' }
    ];

    const userMenu = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/user/dashboard' },
      { label: 'Mes Formulaires', icon: 'pi pi-file', routerLink: '/user/forms' },
      { label: 'Paramètres', icon: 'pi pi-cog', routerLink: '/user/settings' }
    ];

    this.menuItems = this.role === 'admin' ? adminMenu : userMenu;
  }

  logout() {
    this.authService.logout();
  }
}
