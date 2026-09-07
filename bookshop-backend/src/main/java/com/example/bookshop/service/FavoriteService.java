package com.example.bookshop.service;

import com.example.bookshop.model.Book;
import com.example.bookshop.model.Favorite;
import com.example.bookshop.model.LibraryUser;
import com.example.bookshop.repository.BookRepository;
import com.example.bookshop.repository.FavoriteRepository;
import com.example.bookshop.repository.LibraryUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final LibraryUserRepository libraryUserRepository;
    private final BookRepository bookRepository;

    public FavoriteService(FavoriteRepository favoriteRepository,
                           LibraryUserRepository libraryUserRepository,
                           BookRepository bookRepository) {
        this.favoriteRepository = favoriteRepository;
        this.libraryUserRepository = libraryUserRepository;
        this.bookRepository = bookRepository;
    }

    public Favorite addBookToFavorites(String username, Long bookId) {
        LibraryUser libraryUser = libraryUserRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + bookId));

        if (favoriteRepository.existsByLibraryUserAndBook(libraryUser, book)) {
            throw new IllegalArgumentException("Book is already in favorites");
        }

        Favorite favorite = new Favorite();
        favorite.setLibraryUser(libraryUser);
        favorite.setBook(book);

        return favoriteRepository.save(favorite);
    }

    public List<Favorite> getUserFavorites(String username) {
        LibraryUser libraryUser = libraryUserRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        return favoriteRepository.findByLibraryUser(libraryUser);
    }

    public void removeBookFromFavorites(String username, Long bookId) {
        LibraryUser libraryUser = libraryUserRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + bookId));

        favoriteRepository.deleteByLibraryUserAndBook(libraryUser, book);
    }
}
