import { Product } from '../products/product';

export class CartItem {
	public readonly totalPrice = this.product.price * this.quantity;

	constructor(
		public readonly product: Product, 
		public readonly quantity: number = 1
	) { }
}
