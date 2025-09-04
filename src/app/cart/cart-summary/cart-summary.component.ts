import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service.interface';

@Component({
	selector: 'app-cart-summary',
	imports: [
		MatListModule,
		MatButton,
		RouterLink,
	],
	templateUrl: './cart-summary.component.html',
	styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {
	protected readonly cart = inject(CartService);
}
