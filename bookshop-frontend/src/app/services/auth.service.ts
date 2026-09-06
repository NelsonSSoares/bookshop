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
  private readonly loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  signup(username: string, password: string): Observable<string> {
    return this.httpClient.post(`${this.apiUrl}/signup`, { username, password }, { responseType: 'text' });
  }

  login(username: string, password: string): Observable<string> {
    return this.httpClient.post(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' }).pipe(
      tap(token => {
        localStorage.setItem(this.tokenKey, token);
        this.loggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
