import { Component, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { CartService } from '../service/cart.service.interface';

@Component({
	selector: 'app-cart-page',
	imports: [
		MatList,
		MatListItem,
		MatIcon,
		MatIconButton,
		MatButtonModule,
	],
	templateUrl: './cart-page.component.html',
	styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
	protected readonly cart = inject(CartService);
}
