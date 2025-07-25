import { Component, inject, input } from '@angular/core';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { CartService } from './service/cart.service.interface';

@Component({
	selector: 'app-cart',
	imports: [
		CartPageComponent,
		CartSummaryComponent,
		EmptyCartComponent,
	],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss'
})
export class CartComponent {
	public readonly summary = input(false);
	protected readonly title = input();

	protected readonly cart = inject(CartService);
}
