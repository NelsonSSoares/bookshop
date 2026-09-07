package com.example.bookshop.repository;

import com.example.bookshop.model.Book;
import com.example.bookshop.model.LibraryUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {
    List<Book> findByPublisher(LibraryUser publisher);
}
