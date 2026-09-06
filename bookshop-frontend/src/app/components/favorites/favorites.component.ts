import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Favorite } from '../../models/favorite.model';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];
  errorMessage = '';

  constructor(private readonly favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getUserFavorites().subscribe({
      next: favorites => this.favorites = favorites,
      error: () => this.errorMessage = 'Failed to load favorites'
    });
  }
}
