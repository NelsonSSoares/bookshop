package com.example.bookshop.repository;

import com.example.bookshop.model.Book;
import com.example.bookshop.model.LibraryUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByPublisher(LibraryUser publisher);
}
