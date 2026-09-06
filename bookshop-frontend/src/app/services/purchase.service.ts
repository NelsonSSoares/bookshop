import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private readonly apiUrl = 'http://localhost:8080/api/purchases';

  constructor(private readonly httpClient: HttpClient) {}

  buyBook(bookId: number): Observable<Purchase> {
    return this.httpClient.post<Purchase>(this.apiUrl, { bookId });
  }

  getUserPurchases(): Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(this.apiUrl);
  }
}
