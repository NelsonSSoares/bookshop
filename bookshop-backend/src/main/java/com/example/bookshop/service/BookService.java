package com.example.bookshop.service;

import com.example.bookshop.model.Book;
import com.example.bookshop.model.LibraryUser;
import com.example.bookshop.repository.BookRepository;
import com.example.bookshop.repository.LibraryUserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final LibraryUserRepository libraryUserRepository;

    public BookService(BookRepository bookRepository, LibraryUserRepository libraryUserRepository) {
        this.bookRepository = bookRepository;
        this.libraryUserRepository = libraryUserRepository;
    }

    public Book createBook(String username, String title, String author, String description, Double price, String photo) {
        LibraryUser publisher = libraryUserRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        Book newBook = new Book();
        newBook.setTitle(title);
        newBook.setAuthor(author);
        newBook.setDescription(description);
        newBook.setPrice(price);
        newBook.setPhoto(photo);
        newBook.setPublisher(publisher);

        return bookRepository.save(newBook);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getBooksByPublisher(String username) {
        LibraryUser publisher = libraryUserRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        return bookRepository.findByPublisher(publisher);
    }

    public Book updateBook(String username, Long bookId, String title, String author, String description, Double price, String photo) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + bookId));

        if (book.getPublisher() == null || !book.getPublisher().getUsername().equals(username)) {
            throw new AccessDeniedException("You can only edit books you published");
        }

        book.setTitle(title);
        book.setAuthor(author);
        book.setDescription(description);
        book.setPrice(price);
        book.setPhoto(photo);

        return bookRepository.save(book);
    }

    public void deleteBook(String username, Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + bookId));

        if (book.getPublisher() == null || !book.getPublisher().getUsername().equals(username)) {
            throw new AccessDeniedException("You can only delete books you published");
        }

        bookRepository.delete(book);
    }
}
