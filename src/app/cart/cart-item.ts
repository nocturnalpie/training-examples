import { ProductSummary } from '../products/product.interface';

export class CartItem {
	public readonly totalPrice = this.product.price * this.quantity;

	constructor(
		public readonly product: ProductSummary, 
		public readonly quantity: number = 1
	) { }
}
