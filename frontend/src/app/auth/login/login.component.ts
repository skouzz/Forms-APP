import { Component, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log("✅ Connexion réussie", response);

          // 🔥 Store token and role in localStorage
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("role", response.role);

          // 🚀 Redirect to a single dashboard route
          this.router.navigate(["/dashboard"]);
        },
        (error) => {
          this.errorMessage = "❌ Email ou mot de passe incorrect";
          console.error("⚠️ Échec de connexion", error);
        }
      );
    }
  }
}
