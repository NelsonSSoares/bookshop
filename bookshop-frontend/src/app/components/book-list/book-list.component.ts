import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';
import { BookSearchFilters, BookService } from '../../services/book.service';
import { FavoriteService } from '../../services/favorite.service';
import { PurchaseService } from '../../services/purchase.service';
import { BOOK_CATEGORIES } from '../../constants/book-categories.constant';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  isLoggedIn$: Observable<boolean>;
  errorMessage = '';

  filters: BookSearchFilters = {};
  searchTerm = '';
  categories = BOOK_CATEGORIES;
  sortOptions = [
    { value: '', label: 'Default' },
    { value: 'priceAsc', label: 'Price: Low to High' },
    { value: 'priceDesc', label: 'Price: High to Low' }
  ];

  private readonly searchTermSubject = new Subject<string>();
  private readonly searchSubscription: Subscription;

  constructor(
    private readonly bookService: BookService,
    private readonly favoriteService: FavoriteService,
    private readonly purchaseService: PurchaseService,
    private readonly authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.searchSubscription = this.searchTermSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.filters.name = term;
      this.loadBooks();
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  loadBooks(): void {
    this.bookService.getAllBooks(this.filters).subscribe({
      next: books => this.books = books,
      error: () => this.errorMessage = 'Failed to load books'
    });
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
    this.searchTermSubject.next(value);
  }

  onCategoryChange(category: string): void {
    this.filters.category = category;
    this.loadBooks();
  }

  onSortChange(sort: string): void {
    this.filters.sort = sort as BookSearchFilters['sort'];
    this.loadBooks();
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
