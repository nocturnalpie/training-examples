import { InjectionToken, Signal } from "@angular/core";
import { ProductSummary } from "../../products/product.interface";
import { CartItem } from "../cart-item";

export const CartService = new InjectionToken<ICartService>('Cart Service Interface');

export interface ICartService {
	itemsInCart: Signal<CartItem[]>;
	subtotal: Signal<number>;
	deliveryFee: Signal<number>;
	total: Signal<number>;
	totalQuantity: Signal<number>;

	addItem(itemToAdd: ProductSummary): void;
	increaseItemQuantity(itemToUpdate: CartItem): void;
	decreaseItemQuantity(itemToUpdate: CartItem): void;
	removeItem(itemToRemove: CartItem): void;
}