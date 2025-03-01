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

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user'], // Default role
      adminCode: [{ value: '', disabled: true }, Validators.required] // Initially disabled
    });

    // Subscribe to role changes to enable/disable adminCode dynamically
    this.signupForm.get('role')?.valueChanges.subscribe((role) => {
      if (role === 'admin') {
        this.signupForm.get('adminCode')?.enable(); // Enable field when admin is selected
      } else {
        this.signupForm.get('adminCode')?.disable(); // Disable & clear when role is user
        this.signupForm.get('adminCode')?.reset();
      }
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.getRawValue(); // Retrieve all values, including adminCode

      // Admin code validation (optional)
      if (formData.role === 'admin' && formData.adminCode !== 'secret123') {
        this.errorMessage = 'Invalid admin code!';
        return;
      }

      // Remove adminCode if user is not an admin
      if (formData.role !== 'admin') {
        delete formData.adminCode;
      }

      console.log('Sending data to backend:', formData);

      this.authService.signup(formData).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = error.error?.message || 'Signup failed.';
        }
      });
    }
  }
}
