import { computed, EnvironmentProviders, makeEnvironmentProviders, signal } from '@angular/core';
import { ProductSummary } from '../../../products/product.interface';
import { CartItem } from '../../cart-item';
import { CartHelpers, INITIAL_STATE } from '../cart.helpers';
import { CartService, ICartService } from '../cart.service.interface';

export class CartSignalsService implements ICartService {
	itemsInCart = signal<CartItem[]>(INITIAL_STATE)

	subtotal = computed(() => CartHelpers.subtotal(this.itemsInCart()));

	deliveryFee = computed(() => CartHelpers.deliveryFee(this.itemsInCart()));

	total = computed(() => CartHelpers.total(this.itemsInCart()));

	totalQuantity = computed(() => CartHelpers.totalQuantity(this.itemsInCart()));

	addItem = (itemToAdd: ProductSummary): void =>
		this.itemsInCart.update((cartItems) => CartHelpers.addItem(cartItems, itemToAdd))

	increaseItemQuantity = (itemToUpdate: CartItem) =>
		this.itemsInCart.update((cartItems) => CartHelpers.increaseItemQuantity(cartItems, itemToUpdate))

	decreaseItemQuantity = (itemToUpdate: CartItem) =>
		this.itemsInCart.update((cartItems) => CartHelpers.decreaseItemQuantity(cartItems, itemToUpdate))

	removeItem = (itemToRemove: CartItem): void =>
		this.itemsInCart.update((cartItems) => CartHelpers.removeItem(cartItems, itemToRemove))
}

export const provideSignalsStore = (): EnvironmentProviders => makeEnvironmentProviders([
	{ provide: CartService, useClass: CartSignalsService }
]);
