package com.example.bookshop.controller;

import com.example.bookshop.model.Book;
import com.example.bookshop.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<Book> postBook(@RequestBody PostBookRequest postBookRequest) {
        Book createdBook = bookService.createBook(
                postBookRequest.title(),
                postBookRequest.author(),
                postBookRequest.description(),
                postBookRequest.price(),
                postBookRequest.photo());

        return ResponseEntity.ok(createdBook);
    }

    public record PostBookRequest(String title, String author, String description, Double price, String photo) {
    }
}
