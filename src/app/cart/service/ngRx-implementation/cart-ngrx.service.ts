import { EnvironmentProviders, Injectable, makeEnvironmentProviders } from '@angular/core';
import { Store, createAction, createFeatureSelector, createReducer, createSelector, on, props, provideState, provideStore } from '@ngrx/store';
import { Product } from '../../../products/product';
import { CartItem } from '../../cart-item';
import { CartHelpers, INITIAL_STATE } from '../cart.helpers';
import { CartService, ICartService } from '../cart.service.interface';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CartNgrxService implements ICartService {
	private _itemAdded: Subject<void> = new Subject();
	public itemAdded: Observable<void> = this._itemAdded.asObservable();
	
	get itemsInCart(): CartItem[] {
		return this.store.selectSignal(cartSelector((cartItems: CartItem[]) => cartItems))();
	}
	get subtotal(): number {
		return this.store.selectSignal(cartSelector((cartItems: CartItem[]) => CartHelpers.subtotal(cartItems ?? [])))();
	}
	get deliveryFee(): number {
		return this.store.selectSignal(cartSelector((cartItems: CartItem[]) => CartHelpers.deliveryFee(cartItems ?? [])))();
	}
	get total(): number {
		return this.store.selectSignal(cartSelector((cartItems: CartItem[]) => CartHelpers.total(cartItems ?? [])))();
	}
	get totalQuantity(): number {
		return this.store.selectSignal(cartSelector((cartItems: CartItem[]) => CartHelpers.totalQuantity(cartItems ?? [])))();
	}

	constructor(private store: Store<CartItem[]>) { }

	addItem(itemToAdd: Product): void {
		this.store.dispatch(addItem({ itemToAdd }));
		this._itemAdded.next();
	}
	increaseItemQuantity(itemToUpdate: CartItem): void {
		this.store.dispatch(increaseItemQuantity({ itemToUpdate }));
	}
	decreaseItemQuantity(itemToUpdate: CartItem): void {
		this.store.dispatch(decreaseItemQuantity({ itemToUpdate }));
	}
	removeItem(itemToRemove: CartItem): void {
		this.store.dispatch(removeItem({ itemToRemove }));
	}

}

const cartSelector = <T>(callback: (cartItems: CartItem[]) => T) => createSelector(
	createFeatureSelector<CartItem[]>(CART_STATE_FEATURE_NAME),
	callback
)

// Actions
const addItem = createAction('addItem', props<{ itemToAdd: Product }>());
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