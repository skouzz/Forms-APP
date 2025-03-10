import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar/sidebar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('contentAnimation', [
      state('collapsed', style({
        left: '60px',
        width: 'calc(100% - 60px)',
      })),
      state('expanded', style({
        left: '18rem',
        width: 'calc(100% - 18rem)',
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  sidebarVisible = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((visible) => {
      this.sidebarVisible = visible;
    });
  }
}
