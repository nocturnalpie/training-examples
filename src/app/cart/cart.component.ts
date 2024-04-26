import { Component, Inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { CartService } from '../../main';
import { ICartService } from './service/cart.service.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    EmptyCartComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(@Inject(CartService) public readonly cart: ICartService) {}
}
