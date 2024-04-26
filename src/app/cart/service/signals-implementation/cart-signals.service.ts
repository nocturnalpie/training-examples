import { computed, signal } from '@angular/core';
import { Product } from '../../../products/product';
import { CartItem } from '../../cart-item';
import { CartHelpers, INITIAL_STATE } from '../cart.helpers';
import { ICartService } from '../cart.service.interface';

export class CartSignalsService implements ICartService {
	get itemsInCart(): CartItem[] {
		return this._itemsInCart();
	}

	get subtotal(): number {
		return computed(() => CartHelpers.subtotal(this._itemsInCart()))();
	}

	get deliveryFee(): number {
		return computed(() => CartHelpers.deliveryFee(this._itemsInCart()))();
	}

	get total(): number {
		return computed(() => CartHelpers.total(this._itemsInCart()))();
	}

	get totalQuantity(): number {
		return computed(() => CartHelpers.totalQuantity(this._itemsInCart()))();
	}

	private _itemsInCart = signal<CartItem[]>(INITIAL_STATE)

	addItem = (itemToAdd: Product): void =>
		this._itemsInCart.update((cartItems) => CartHelpers.addItem(cartItems, itemToAdd))

	increaseItemQuantity = (itemToUpdate: CartItem) =>
		this._itemsInCart.update((cartItems) => CartHelpers.increaseItemQuantity(cartItems, itemToUpdate))

	decreaseItemQuantity = (itemToUpdate: CartItem) =>
		this._itemsInCart.update((cartItems) => CartHelpers.decreaseItemQuantity(cartItems, itemToUpdate))

	removeItem = (itemToRemove: CartItem): void => 
		this._itemsInCart.update((cartItems) => CartHelpers.removeItem(cartItems, itemToRemove))
}
