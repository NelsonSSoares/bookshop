import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly apiUrl = 'http://localhost:8080/api/favorites';

  constructor(private readonly httpClient: HttpClient) {}

  addBookToFavorites(bookId: number): Observable<Favorite> {
    return this.httpClient.post<Favorite>(this.apiUrl, { bookId });
  }

  getUserFavorites(): Observable<Favorite[]> {
    return this.httpClient.get<Favorite[]>(this.apiUrl);
  }
}
