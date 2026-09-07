import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { BOOK_CATEGORIES } from '../../constants/book-categories.constant';

@Component({
  selector: 'app-my-publications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-publications.component.html',
  styleUrl: './my-publications.component.css'
})
export class MyPublicationsComponent implements OnInit {
  books: Book[] = [];
  editingBook?: Book;
  categories = BOOK_CATEGORIES;
  photoPreview?: string;
  errorMessage = '';

  constructor(private readonly bookService: BookService) {}

  ngOnInit(): void {
    this.loadMyPublications();
  }

  loadMyPublications(): void {
    this.bookService.getMyPublications().subscribe({
      next: books => this.books = books,
      error: () => this.errorMessage = 'Failed to load your publications'
    });
  }

  startEdit(book: Book): void {
    this.editingBook = { ...book };
    this.photoPreview = book.photo;
  }

  cancelEdit(): void {
    this.editingBook = undefined;
    this.photoPreview = undefined;
  }

  onEditPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
      if (this.editingBook) {
        this.editingBook.photo = this.photoPreview;
      }
    };
    reader.readAsDataURL(file);
  }

  submitUpdate(): void {
    if (!this.editingBook) {
      return;
    }

    this.errorMessage = '';
    this.bookService.updateBook(this.editingBook).subscribe({
      next: updatedBook => {
        this.books = this.books.map(book => (book.id === updatedBook.id ? updatedBook : book));
        this.editingBook = undefined;
        this.photoPreview = undefined;
      },
      error: error => {
        this.errorMessage = error.error || 'Failed to update book';
      }
    });
  }

  deleteBook(book: Book): void {
    if (!book.id) {
      return;
    }

    if (!confirm(`Are you sure you want to delete "${book.title}"?`)) {
      return;
    }

    this.errorMessage = '';
    this.bookService.deleteBook(book.id).subscribe({
      next: () => {
        this.books = this.books.filter(item => item.id !== book.id);
      },
      error: error => {
        this.errorMessage = error.error || 'Failed to delete book';
      }
    });
  }
}
