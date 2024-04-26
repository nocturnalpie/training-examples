import { Component } from '@angular/core';
import { Product } from './product';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  items: Product[] = [
    { id: 1, name: 'Car', price: 10 },
    { id: 2, name: 'Xylophone', price: 50 },
    { id: 3, name: 'Teddy', price: 5 },
    { id: 4, name: 'Train', price: 7 },
    { id: 5, name: 'Squishmallow', price: 6 },
    { id: 6, name: 'Helicopter', price: 30 },
    { id: 7, name: 'Tamagotchi', price: 25 },
  ];

  constructor(public readonly cart: CartService) {}
}
