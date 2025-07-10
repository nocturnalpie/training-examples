import { CartItem } from '../cart-item';
import { Product } from '../../products/product';

export const INITIAL_STATE: CartItem[] = [];
export const SHIPPING = 3.98

export class CartHelpers {
	static subtotal = (itemsInCart: CartItem[]): number => itemsInCart.reduce((total, item) => total + item.totalPrice, 0)

	static deliveryFee = (itemsInCart: CartItem[]): number => CartHelpers.subtotal(itemsInCart) > 50 ? 0 : SHIPPING

	static total = (itemsInCart: CartItem[]): number => CartHelpers.subtotal(itemsInCart) + CartHelpers.deliveryFee(itemsInCart)

	static totalQuantity = (itemsInCart: CartItem[]) => itemsInCart.reduce(
		(quantityAccumulator, item) => quantityAccumulator + item.quantity,
		0
	)

	static addItem = (itemsInCart: CartItem[], itemToAdd: Product): CartItem[] => {
		const itemInCart = CartHelpers.findProduct(itemsInCart, itemToAdd);

		if (itemInCart) {
			return CartHelpers.increaseItemQuantity(itemsInCart, itemInCart);
		} else {
			return [...itemsInCart, new CartItem(itemToAdd)];
		}
	}

	static increaseItemQuantity = (itemsInCart: CartItem[], itemToUpdate: CartItem): CartItem[] => itemsInCart.map((cartItem) => cartItem.product.id === itemToUpdate.product.id
		? new CartItem(itemToUpdate.product, cartItem.quantity + 1)
		: cartItem
	)

	static decreaseItemQuantity = (itemsInCart: CartItem[], itemToUpdate: CartItem): CartItem[] => {
		if (itemToUpdate.quantity === 1) {
			return CartHelpers.removeItem(itemsInCart, itemToUpdate);
		} else {
			return itemsInCart.map((cartItem) => cartItem.product.id === itemToUpdate.product.id
				? new CartItem(itemToUpdate.product, cartItem.quantity - 1)
				: cartItem
			);
		}
	}

	static removeItem = (itemsInCart: CartItem[], itemToRemove: CartItem): CartItem[] => itemsInCart.filter(
		(cartItem) => cartItem.product.id != itemToRemove.product.id
	)

	private static findProduct = (itemsInCart: CartItem[], item: Product): CartItem | undefined => itemsInCart.find(
		(cartItem) => cartItem.product.id === item.id
	)
};
