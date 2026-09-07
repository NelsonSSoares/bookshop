import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

export interface BookSearchFilters {
  name?: string;
  category?: string;
  sort?: 'priceAsc' | 'priceDesc' | '';
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly apiUrl = 'http://localhost:8080/api/books';

  constructor(private readonly httpClient: HttpClient) {}

  getAllBooks(filters?: BookSearchFilters): Observable<Book[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.name) {
        params = params.set('name', filters.name);
      }
      if (filters.category) {
        params = params.set('category', filters.category);
      }
      if (filters.sort) {
        params = params.set('sort', filters.sort);
      }
    }
    return this.httpClient.get<Book[]>(this.apiUrl, { params });
  }

  getMyPublications(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiUrl}/my-publications`);
  }

  postBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.apiUrl, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }

  deleteBook(bookId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${bookId}`);
  }
}
