import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { FavoriteService } from '../../services/favorite.service';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { title: '', author: '', description: '', price: 0 };
  isLoggedIn$: Observable<boolean>;
  errorMessage = '';

  constructor(
    private readonly bookService: BookService,
    private readonly favoriteService: FavoriteService,
    private readonly purchaseService: PurchaseService,
    private readonly authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: books => this.books = books,
      error: () => this.errorMessage = 'Failed to load books'
    });
  }

  postBook(): void {
    this.bookService.postBook(this.newBook).subscribe({
      next: () => {
        this.newBook = { title: '', author: '', description: '', price: 0 };
        this.loadBooks();
      },
      error: () => this.errorMessage = 'Failed to post book'
    });
  }

  addToFavorites(book: Book): void {
    if (!book.id) {
      return;
    }
    this.favoriteService.addBookToFavorites(book.id).subscribe({
      error: error => this.errorMessage = error.error || 'Failed to add to favorites'
    });
  }

  buyBook(book: Book): void {
    if (!book.id) {
      return;
    }
    this.purchaseService.buyBook(book.id).subscribe({
      next: () => alert(`Purchased ${book.title}`),
      error: error => this.errorMessage = error.error || 'Failed to buy book'
    });
  }
}
