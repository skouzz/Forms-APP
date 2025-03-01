import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  token = '';
  newPassword = '';
  confirmPassword = '';
  message = '';
  passwordMismatch = false; // Ajout de la propriété

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.token = this.route.snapshot.queryParams['token']; // Récupérer le token depuis l'URL
  }

  validatePasswords() {
    this.passwordMismatch = this.newPassword !== this.confirmPassword;
  }

  resetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.message = 'Veuillez remplir les deux champs';
      return;
    }

    if (this.passwordMismatch) {
      this.message = 'Les mots de passe ne correspondent pas !';
      return;
    }

    this.http.post('http://localhost:3000/auth/reset-password', { token: this.token, newPassword: this.newPassword })
      .subscribe({
        next: () => {
          this.message = 'Mot de passe mis à jour avec succès. Redirection vers la connexion...';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: err => this.message = err.error.message || 'Erreur lors de la réinitialisation du mot de passe'
      });
  }
}
