import { computed, EnvironmentProviders, makeEnvironmentProviders, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductSummary } from '../../../products/product.interface';
import { CartItem } from '../../cart-item';
import { CartHelpers, INITIAL_STATE } from '../cart.helpers';
import { CartService, ICartService } from '../cart.service.interface';

export class CartSignalsService implements ICartService {
	private _itemAdded: Subject<void> = new Subject();
	itemAdded: Observable<void> = this._itemAdded.asObservable();
	
	private _itemsInCart = signal<CartItem[]>(INITIAL_STATE)
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
	
	addItem = (itemToAdd: ProductSummary): void => {
		this._itemsInCart.update((cartItems) => CartHelpers.addItem(cartItems, itemToAdd))
		this._itemAdded.next()
	}

	increaseItemQuantity = (itemToUpdate: CartItem) =>
		this._itemsInCart.update((cartItems) => CartHelpers.increaseItemQuantity(cartItems, itemToUpdate))

	decreaseItemQuantity = (itemToUpdate: CartItem) =>
		this._itemsInCart.update((cartItems) => CartHelpers.decreaseItemQuantity(cartItems, itemToUpdate))

	removeItem = (itemToRemove: CartItem): void =>
		this._itemsInCart.update((cartItems) => CartHelpers.removeItem(cartItems, itemToRemove))
}

export const provideSignalsStore = (): EnvironmentProviders => makeEnvironmentProviders([
	{ provide: CartService, useClass: CartSignalsService }
]);
