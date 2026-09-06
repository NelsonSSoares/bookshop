package com.example.bookshop.repository;

import com.example.bookshop.model.Book;
import com.example.bookshop.model.Favorite;
import com.example.bookshop.model.LibraryUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByLibraryUser(LibraryUser libraryUser);

    boolean existsByLibraryUserAndBook(LibraryUser libraryUser, Book book);
}
