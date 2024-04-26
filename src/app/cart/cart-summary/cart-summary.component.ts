import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from '../empty-cart/empty-cart.component';
import { CartService } from '../../../main';
import { ICartService } from '../service/cart.service.interface';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [MatListModule, MatButtonModule, RouterModule, EmptyCartComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent {
  constructor(@Inject(CartService) public readonly cart: ICartService) {}
}
