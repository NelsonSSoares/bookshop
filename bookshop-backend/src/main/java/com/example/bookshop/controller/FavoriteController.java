package com.example.bookshop.controller;

import com.example.bookshop.model.Favorite;
import com.example.bookshop.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<Favorite> addBookToFavorites(@RequestBody AddFavoriteRequest addFavoriteRequest, Principal principal) {
        Favorite favorite = favoriteService.addBookToFavorites(principal.getName(), addFavoriteRequest.bookId());
        return ResponseEntity.ok(favorite);
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> getUserFavorites(Principal principal) {
        List<Favorite> favorites = favoriteService.getUserFavorites(principal.getName());
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> removeBookFromFavorites(@PathVariable Long bookId, Principal principal) {
        favoriteService.removeBookFromFavorites(principal.getName(), bookId);
        return ResponseEntity.ok().build();
    }

    public record AddFavoriteRequest(Long bookId) {
    }
}
