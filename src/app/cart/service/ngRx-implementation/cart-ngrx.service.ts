import { EnvironmentProviders, inject, Injectable, makeEnvironmentProviders } from '@angular/core';
import { createAction, createFeatureSelector, createReducer, createSelector, on, props, provideState, provideStore, Store } from '@ngrx/store';
import { ProductSummary } from '../../../products/product.interface';
import { CartItem } from '../../cart-item';
import { CartHelpers, INITIAL_STATE } from '../cart.helpers';
import { CartService, ICartService } from '../cart.service.interface';

@Injectable({
	providedIn: 'root'
})
export class CartNgrxService implements ICartService {
	private store = inject(Store<CartItem[]>);
	
	itemsInCart = this.store.selectSignal(cartSelector((cartItems: CartItem[]) => cartItems));

	subtotal = this.store.selectSignal(cartSelector((cartItems: CartItem[]) => CartHelpers.subtotal(cartItems ?? [])));

	deliveryFee = this.store.selectSignal(cartSelector((cartItems: CartItem[]) => CartHelpers.deliveryFee(cartItems ?? [])));

	total = this.store.selectSignal(cartSelector((cartItems: CartItem[]) => CartHelpers.total(cartItems ?? [])));

	totalQuantity = this.store.selectSignal(cartSelector((cartItems: CartItem[]) => CartHelpers.totalQuantity(cartItems ?? [])));

	addItem = (itemToAdd: ProductSummary): void => 
		this.store.dispatch(addItem({ itemToAdd }));

	increaseItemQuantity = (itemToUpdate: CartItem): void =>
		this.store.dispatch(increaseItemQuantity({ itemToUpdate }));

	decreaseItemQuantity = (itemToUpdate: CartItem): void =>
		this.store.dispatch(decreaseItemQuantity({ itemToUpdate }));

	removeItem = (itemToRemove: CartItem): void =>
		this.store.dispatch(removeItem({ itemToRemove }));
}

const cartSelector = <T>(callback: (cartItems: CartItem[]) => T) => createSelector(
	createFeatureSelector<CartItem[]>(CART_STATE_FEATURE_NAME),
	callback
)

// Actions
const addItem = createAction('addItem', props<{ itemToAdd: ProductSummary }>());
const increaseItemQuantity = createAction('increaseItemQuantity', props<{ itemToUpdate: CartItem }>());
const decreaseItemQuantity = createAction('decreaseItemQuantity', props<{ itemToUpdate: CartItem }>());
const removeItem = createAction('removeItem', props<{ itemToRemove: CartItem }>());

// Reducers
const CART_REDUCER = createReducer(
	INITIAL_STATE,

	on(addItem, (cartItems, { itemToAdd }) =>
		CartHelpers.addItem(cartItems, itemToAdd)
	),

	on(increaseItemQuantity, (cartItems, { itemToUpdate }) =>
		CartHelpers.increaseItemQuantity(cartItems, itemToUpdate)
	),

	on(decreaseItemQuantity, (cartItems, { itemToUpdate }) =>
		CartHelpers.decreaseItemQuantity(cartItems, itemToUpdate)
	),

	on(removeItem, (cartItems, { itemToRemove }) =>
		CartHelpers.removeItem(cartItems, itemToRemove)
	),
);

const CART_STATE_FEATURE_NAME = 'cart'

export const provideNgRxStore = (): EnvironmentProviders => makeEnvironmentProviders([
	provideStore(),
	provideState({ name: CART_STATE_FEATURE_NAME, reducer: CART_REDUCER }),
	{ provide: CartService, useClass: CartNgrxService }
]);