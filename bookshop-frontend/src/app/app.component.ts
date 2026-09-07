import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string | null>;

  constructor(private readonly authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.username$ = this.authService.username$;
  }

  logout(): void {
    this.authService.logout();
  }
}
