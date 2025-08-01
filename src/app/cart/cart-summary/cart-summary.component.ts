import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service.interface';

@Component({
	selector: 'app-cart-summary',
	imports: [
		MatList,
		MatListItem,
		MatButton,
		RouterLink,
	],
	templateUrl: './cart-summary.component.html',
	styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {
	protected readonly cart = inject(CartService);
}
