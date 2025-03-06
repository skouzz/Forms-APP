import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Import Angular Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

// Import PrimeNG modules
import { MenuModule } from 'primeng/menu';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(FormsModule),  // Support for ngModel
    importProvidersFrom(MatIconModule), // Provide MatIconModule
    importProvidersFrom(MatSidenavModule), // Provide MatSidenavModule
    importProvidersFrom(MatListModule), // Provide MatListModule
    importProvidersFrom(MatButtonModule), // Provide MatButtonModule
    importProvidersFrom(MenuModule), // Add MenuModule here
    provideAnimationsAsync(),
    provideAnimationsAsync(), // Provide animations async
  ],
};
