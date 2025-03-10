import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    const savedMode = localStorage.getItem('darkMode');
    const initialMode = savedMode ? JSON.parse(savedMode) : false;
    this.isDarkModeSubject.next(initialMode);
    this.applyTheme(initialMode);
  }

  toggleDarkMode(): void {
    const newMode = !this.isDarkModeSubject.value;
    console.log('Toggling theme to:', newMode ? 'Dark' : 'Light');
    this.isDarkModeSubject.next(newMode);
    this.applyTheme(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  }

  private applyTheme(isDark: boolean): void {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      console.log('Found theme link, updating href...');
      themeLink.href = isDark
        ? '/assets/themes/lara-dark-indigo.css'
        : '/assets/themes/lara-light-indigo.css';
      console.log('New theme href:', themeLink.href);
    } else {
      console.error('Theme link element not found! Ensure <link id="app-theme"> exists in index.html');
    }
    document.body.classList.toggle('dark-mode', isDark);
    console.log('Body classList after toggle:', document.body.classList.toString());
  }
}
