package com.example.bookshop.repository;

import com.example.bookshop.model.LibraryUser;
import com.example.bookshop.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByLibraryUser(LibraryUser libraryUser);
}
