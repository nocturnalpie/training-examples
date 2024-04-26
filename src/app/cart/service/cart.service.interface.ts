import { Product } from "../../products/product";
import { CartItem } from "../cart-item";

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