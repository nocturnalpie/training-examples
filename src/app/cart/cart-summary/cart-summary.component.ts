import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../service/cart.service';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from '../empty-cart/empty-cart.component';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [MatListModule, MatButtonModule, RouterModule, EmptyCartComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent {
  constructor(public readonly cart: CartService) {}
}
