import { computed } from '@angular/core';
import { Product } from '../products/product';

export class CartItem {
	get totalPrice(): number {
		return this._totalPrice();
	}

	private _totalPrice = computed(() => this.product.price * this.quantity);

	constructor(public product: Product, public quantity: number = 1) { }
}
