import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  isSignupMode = false;
  errorMessage = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  submitForm(): void {
    this.errorMessage = '';

    if (this.isSignupMode) {
      this.authService.signup(this.username, this.password).subscribe({
        next: () => {
          this.isSignupMode = false;
          this.errorMessage = 'Signup successful. Please log in.';
        },
        error: error => this.errorMessage = error.error || 'Signup failed'
      });
    } else {
      this.authService.login(this.username, this.password).subscribe({
        next: () => this.router.navigate(['/books']),
        error: error => this.errorMessage = error.error || 'Login failed'
      });
    }
  }
}
