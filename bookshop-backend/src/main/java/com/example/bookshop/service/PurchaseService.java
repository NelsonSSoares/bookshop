package com.example.bookshop.service;

import com.example.bookshop.model.Book;
import com.example.bookshop.model.LibraryUser;
import com.example.bookshop.model.Purchase;
import com.example.bookshop.repository.BookRepository;
import com.example.bookshop.repository.LibraryUserRepository;
import com.example.bookshop.repository.PurchaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final LibraryUserRepository libraryUserRepository;
    private final BookRepository bookRepository;

    public PurchaseService(PurchaseRepository purchaseRepository,
                           LibraryUserRepository libraryUserRepository,
                           BookRepository bookRepository) {
        this.purchaseRepository = purchaseRepository;
        this.libraryUserRepository = libraryUserRepository;
        this.bookRepository = bookRepository;
    }

    public Purchase buyBook(String username, Long bookId) {
        LibraryUser libraryUser = libraryUserRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + bookId));

        Purchase purchase = new Purchase();
        purchase.setLibraryUser(libraryUser);
        purchase.setBook(book);
        purchase.setPurchaseTimestamp(LocalDateTime.now());

        return purchaseRepository.save(purchase);
    }

    public List<Purchase> getUserPurchases(String username) {
        LibraryUser libraryUser = libraryUserRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        return purchaseRepository.findByLibraryUser(libraryUser);
    }
}
