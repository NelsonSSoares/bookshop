import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent {
  book: Book = { title: '', author: '', description: '', price: 0 };
  errorMessage = '';
  photoPreview?: string;

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router
  ) {}

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
      this.book.photo = this.photoPreview;
    };
    reader.readAsDataURL(file);
  }

  submitBook(): void {
    this.errorMessage = '';
    this.bookService.postBook(this.book).subscribe({
      next: () => this.router.navigate(['/books']),
      error: () => this.errorMessage = 'Failed to post book'
    });
  }
}
