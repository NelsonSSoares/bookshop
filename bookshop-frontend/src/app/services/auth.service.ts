import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly tokenKey = 'bookshop_token';
  private readonly usernameKey = 'bookshop_username';
  private readonly loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private readonly usernameSubject = new BehaviorSubject<string | null>(this.getStoredUsername());

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  get username$(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  signup(username: string, password: string): Observable<string> {
    return this.httpClient.post(`${this.apiUrl}/signup`, { username, password }, { responseType: 'text' });
  }

  login(username: string, password: string): Observable<string> {
    return this.httpClient.post(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' }).pipe(
      tap(token => {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.usernameKey, username);
        this.loggedInSubject.next(true);
        this.usernameSubject.next(username);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    this.loggedInSubject.next(false);
    this.usernameSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getStoredUsername(): string | null {
    const storedUsername = localStorage.getItem(this.usernameKey);
    if (storedUsername) {
      return storedUsername;
    }

    const token = this.getToken();
    return token ? this.extractNameFromToken(token) : null;
  }

  private extractNameFromToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.name ?? null;
    } catch {
      return null;
    }
  }
}
