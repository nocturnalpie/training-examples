import { Component, inject, input } from '@angular/core';
import { CartService } from '../../cart/service/cart.service.interface';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { Product } from '../product.interface';

@Component({
	selector: 'app-products',
	imports: [ProductSummaryComponent],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss',
})
export class ProductsComponent {
	protected products: Product[] = [
		{ id: 1, name: 'Car', price: 10 },
		{ id: 2, name: 'Xylophone', price: 50 },
		{ id: 3, name: 'Teddy', price: 5 },
		{ id: 4, name: 'Train', price: 7 },
		{ id: 5, name: 'Squishmallow', price: 6 },
		{ id: 6, name: 'Helicopter', price: 30 },
		{ id: 7, name: 'Tamagotchi', price: 25 },
	];

	protected readonly cart = inject(CartService);
}
