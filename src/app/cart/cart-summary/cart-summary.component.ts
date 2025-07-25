import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service.interface';

@Component({
	selector: 'app-cart-summary',
	imports: [
		MatList,
		MatListItem,
		MatButton,
		RouterModule,
	],
	templateUrl: './cart-summary.component.html',
	styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {
	protected readonly cart = inject(CartService);
}
