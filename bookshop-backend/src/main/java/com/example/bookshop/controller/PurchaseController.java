package com.example.bookshop.controller;

import com.example.bookshop.model.Purchase;
import com.example.bookshop.service.PurchaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping
    public ResponseEntity<Purchase> buyBook(@RequestBody BuyBookRequest buyBookRequest, Principal principal) {
        Purchase purchase = purchaseService.buyBook(principal.getName(), buyBookRequest.bookId());
        return ResponseEntity.ok(purchase);
    }

    @GetMapping
    public ResponseEntity<List<Purchase>> getUserPurchases(Principal principal) {
        List<Purchase> purchases = purchaseService.getUserPurchases(principal.getName());
        return ResponseEntity.ok(purchases);
    }

    public record BuyBookRequest(Long bookId) {
    }
}
