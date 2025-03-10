import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  sidebarVisible$ = this.sidebarVisibleSubject.asObservable();

  toggleSidebar(): void {
    console.log('Toggling sidebar via button, current state:', this.sidebarVisibleSubject.value);
    this.sidebarVisibleSubject.next(!this.sidebarVisibleSubject.value);
  }

  setSidebarVisible(visible: boolean): void {
    console.log('Setting sidebar visibility via hover, current state:', this.sidebarVisibleSubject.value, 'new state:', visible);
    this.sidebarVisibleSubject.next(visible);
  }

  get isExpanded(): boolean {
    return this.sidebarVisibleSubject.value;
  }
}
