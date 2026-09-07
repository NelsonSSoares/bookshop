package com.example.bookshop.controller;

import com.example.bookshop.model.Book;
import com.example.bookshop.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sort) {
        List<Book> books = bookService.searchBooks(name, category, sort);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/my-publications")
    public ResponseEntity<List<Book>> getMyPublications(Principal principal) {
        List<Book> books = bookService.getBooksByPublisher(principal.getName());
        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<Book> postBook(@RequestBody PostBookRequest postBookRequest, Principal principal) {
        Book createdBook = bookService.createBook(
                principal.getName(),
                postBookRequest.title(),
                postBookRequest.author(),
                postBookRequest.description(),
                postBookRequest.price(),
                postBookRequest.category(),
                postBookRequest.photo());

        return ResponseEntity.ok(createdBook);
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Book> updateBook(@PathVariable Long bookId, @RequestBody UpdateBookRequest updateBookRequest, Principal principal) {
        Book updatedBook = bookService.updateBook(
                principal.getName(),
                bookId,
                updateBookRequest.title(),
                updateBookRequest.author(),
                updateBookRequest.description(),
                updateBookRequest.price(),
                updateBookRequest.category(),
                updateBookRequest.photo());

        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long bookId, Principal principal) {
        bookService.deleteBook(principal.getName(), bookId);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Void> handleAccessDeniedException() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    public record PostBookRequest(String title, String author, String description, Double price, String category, String photo) {
    }

    public record UpdateBookRequest(String title, String author, String description, Double price, String category, String photo) {
    }
}
