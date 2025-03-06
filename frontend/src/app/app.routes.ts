import type { Routes } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component"; // Single dashboard component
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { AuthGuard } from "./auth/auth.guard";
import { PublicGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" }, // Redirect to /dashboard by default

  // Public routes with PublicGuard
  { path: "signup", component: SignupComponent, canActivate: [PublicGuard] },
  { path: "login", component: LoginComponent, canActivate: [PublicGuard] },
  { path: "forgot-password", component: ForgotPasswordComponent, canActivate: [PublicGuard] },
  { path: "reset-password", component: ResetPasswordComponent, canActivate: [PublicGuard] },

  // Single dashboard route with role-based data
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: "" }, // Role will be dynamically set in the AuthGuard or DashboardComponent
  },

  // Fallback route
  { path: "**", redirectTo: "/dashboard" }, // Redirect to /dashboard for unknown routes
];
