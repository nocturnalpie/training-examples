import { InjectionToken } from "@angular/core";
import { ProductSummary } from "../../products/product.interface";
import { CartItem } from "../cart-item";
import { Observable } from "rxjs";

export const CartService = new InjectionToken<ICartService>('Cart Service Interface');

export interface ICartService {
	itemsInCart: CartItem[];
	subtotal: number;
	deliveryFee: number;
	total: number;
	totalQuantity: number;
	itemAdded: Observable<void>;

	addItem(itemToAdd: ProductSummary): void;
	increaseItemQuantity(itemToUpdate: CartItem): void;
	decreaseItemQuantity(itemToUpdate: CartItem): void;
	removeItem(itemToRemove: CartItem): void;
}