import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Purchase } from '../../models/purchase.model';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
  purchases: Purchase[] = [];
  errorMessage = '';

  constructor(private readonly purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.purchaseService.getUserPurchases().subscribe({
      next: purchases => this.purchases = purchases,
      error: () => this.errorMessage = 'Failed to load purchases'
    });
  }
}
