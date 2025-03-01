import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Importer Router

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {} // ✅ Injecter Router

  sendResetLink() {
    if (!this.email) {
      this.message = 'Please enter your email';
      return;
    }

    this.http.post('http://localhost:3000/auth/forgot-password', { email: this.email })
      .subscribe({
        next: () => this.message = 'Check your email for the reset link.',
        error: err => this.message = err.error.message || 'Error sending email'
      });
  }

  goToLogin() {
    this.router.navigate(['/login']); // ✅ Redirection vers la page de connexion
  }
}
