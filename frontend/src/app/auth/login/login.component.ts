import { Component, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router"; // ✅ Import RouterModule
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ✅ Ensure RouterModule is imported
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
    private cdRef: ChangeDetectorRef // ✅ ChangeDetectorRef to detect changes
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges(); // ✅ Force Angular to detect changes after rendering
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log("Login successful", response);
          localStorage.setItem("token", response.access_token);
          this.router.navigate(["/dashboard"]);
        },
        (error) => {
          this.errorMessage = "Email ou mot de passe incorrect";
          console.error("Login failed", error);
        }
      );
    }
  }
}
