import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true, // Standalone component
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Import necessary modules
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  submitted = false; // Pour afficher les erreurs après soumission

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['user'], // Rôle par défaut
      adminCode: [{ value: '', disabled: true }] // Désactivé par défaut
    });

    // Gérer l'activation/désactivation du champ adminCode
    this.signupForm.get('role')?.valueChanges.subscribe((role) => {
      const adminCodeControl = this.signupForm.get('adminCode');

      if (role === 'admin') {
        adminCodeControl?.setValidators([Validators.required]);
        adminCodeControl?.enable();
      } else {
        adminCodeControl?.clearValidators();
        adminCodeControl?.setValue('');
        adminCodeControl?.disable();
      }

      adminCodeControl?.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.submitted = true; // Marque le formulaire comme soumis

    if (this.signupForm.valid) {
      const formData = this.signupForm.getRawValue();

      // Vérification du code admin (optionnel)
      if (formData.role === 'admin' && formData.adminCode !== 'secret123') {
        this.errorMessage = 'Code administrateur invalide!';
        return;
      }

      if (formData.role !== 'admin') {
        delete formData.adminCode; // Supprime le champ s'il n'est pas nécessaire
      }

      console.log('Envoi des données au backend:', formData);

      this.authService.signup(formData).subscribe({
        next: () => {
          console.log('Inscription réussie!');
          this.clearCacheAndStorage(); // Clear cache and localStorage after successful signup
          this.router.navigate(['/login']); // Redirection après succès
        },
        error: (error) => {
          console.error('Erreur d’inscription:', error);
          this.errorMessage = error.error?.message || 'Échec de l’inscription.';
        }
      });
    }
  }

  // Clear browser cache and localStorage
  clearCacheAndStorage() {
    // Clearing the browser cache
    if (typeof window !== 'undefined') {
      window.localStorage.clear(); // Clear localStorage
      window.sessionStorage.clear(); // Clear sessionStorage
      // Optionally, clear other caches if needed
      // window.caches.keys().then((cacheNames) => {
      //   cacheNames.forEach((cacheName) => {
      //     window.caches.delete(cacheName);
      //   });
      // });
    }
    console.log('Cache and storage cleared');
  }
}
