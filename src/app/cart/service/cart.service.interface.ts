import { InjectionToken } from "@angular/core";
import { Product } from "../../products/product";
import { CartItem } from "../cart-item";

export const CartService = new InjectionToken<ICartService>('Cart Service Interface');

export interface ICartService {
	itemsInCart: CartItem[];
	subtotal: number;
	deliveryFee: number;
	total: number;
	totalQuantity: number;

	addItem(itemToAdd: Product): void;
	increaseItemQuantity(itemToUpdate: CartItem): void;
	decreaseItemQuantity(itemToUpdate: CartItem): void;
	removeItem(itemToRemove: CartItem): void;
}