import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthGuard } from './auth/auth.guard';
import { PublicGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 🚫 Empêche les utilisateurs connectés d'accéder à ces pages
  { path: 'signup', component: SignupComponent, canActivate: [PublicGuard] },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },

  // 🔒 Routes pour récupérer et réinitialiser le mot de passe
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [PublicGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [PublicGuard] },

  // 🔒 Protège les routes nécessitant une authentification
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // 🌍 Redirection des routes inconnues vers la connexion
  { path: '**', redirectTo: '/login' }
];
