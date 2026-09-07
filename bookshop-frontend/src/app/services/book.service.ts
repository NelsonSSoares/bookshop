import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly apiUrl = 'http://localhost:8080/api/books';

  constructor(private readonly httpClient: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.apiUrl);
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
