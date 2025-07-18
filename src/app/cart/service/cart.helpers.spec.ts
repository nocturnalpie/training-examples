import { Product } from '../../products/product.interface';
import { CartItem } from '../cart-item';
import { CartHelpers, SHIPPING } from './cart.helpers';

describe('CartHelpers', () => {
	const product1: Product = { id: 1, name: '', price: 10 };
	const product2: Product = { id: 2, name: '', price: 14 };

	describe('total', () => {
		const testCases: { itemsInCart: CartItem[]; expectedTotal: number }[] = [
			{
				itemsInCart: [new CartItem({ id: 1, name: '', price: 2 }, 2)],
				expectedTotal: 4 + SHIPPING,
			},
			{
				itemsInCart: [new CartItem({ id: 1, name: '', price: 3 }, 4)],
				expectedTotal: 12 + SHIPPING,
			},
			{
				itemsInCart: [
					new CartItem({ id: 1, name: '', price: 10 }, 3),
					new CartItem({ id: 2, name: '', price: 4 }, 6),
				],
				expectedTotal: 54,
			},
		];

		testCases.forEach((testCase) => {
			it('should be the sum of the cart plus the shipping', () => {
				expect(CartHelpers.total(testCase.itemsInCart)).toEqual(testCase.expectedTotal);
			});
		});
	});

	describe('add item', () => {
		it('should add new items to the list of items with quantity 1', () => {
			const addedItem = CartHelpers.addItem([], product1).pop();

			expect(addedItem?.product).toEqual(product1);
			expect(addedItem?.quantity).toEqual(1);
		});

		it('should increase the quantity by 1 when adding existing items', () => {
			const startingQuantity = 2;

			const newItemsInCart = CartHelpers.addItem([new CartItem(product1, startingQuantity)], product1);

			expect(newItemsInCart.length).toEqual(1);

			const addedItem = newItemsInCart.pop();
			expect(addedItem?.product).toEqual(product1);
			expect(addedItem?.quantity).toEqual(startingQuantity + 1);
		});
	});

	describe('increase item quantity', () => {
		it('should increase the quantity of the given item by 1', () => {
			const startingQuantity = 2;
			const itemToIncrease = new CartItem(product1, startingQuantity);

			const newItemsInCart = CartHelpers.increaseItemQuantity([itemToIncrease], itemToIncrease);

			expect(newItemsInCart.length).toEqual(1);

			const addedItem = newItemsInCart.pop();
			expect(addedItem?.product).toEqual(product1);
			expect(addedItem?.quantity).toEqual(startingQuantity + 1);
		});

		it('should not add items not already in the list', () => {
			const newItemsInCart = CartHelpers.increaseItemQuantity([new CartItem(product1)], new CartItem(product2));

			const updatedItem = newItemsInCart.find((cartItem) => cartItem.product.id === product2.id);
			expect(updatedItem).toBeUndefined();
		});
	});

	describe('decrease item quantity', () => {
		it('should decrease the quantity of the given item by 1', () => {
			const startingQuantity = 2;
			const itemToIncrease = new CartItem(product1, startingQuantity);

			const newItemsInCart = CartHelpers.decreaseItemQuantity([itemToIncrease], itemToIncrease);

			expect(newItemsInCart.length).toEqual(1);

			const addedItem = newItemsInCart.pop();
			expect(addedItem?.product).toEqual(product1);
			expect(addedItem?.quantity).toEqual(startingQuantity - 1);
		});

		it('should remove items that have a quantity of 1', () => {
			const newItemsInCart = CartHelpers.decreaseItemQuantity([new CartItem(product1)], new CartItem(product1));

			expect(newItemsInCart.length).toEqual(0);
		});
	});

	describe('remove item', () => {
		it('should remove the given item from the cart', () => {
			const itemToRemove = new CartItem(product1);

			const newItemsInCart = CartHelpers.removeItem([itemToRemove], itemToRemove);

			expect(newItemsInCart.length).toEqual(0);
		});

		it('should only remove the given item from the cart', () => {
			const newItemsInCart = CartHelpers.removeItem([new CartItem(product1)], new CartItem(product2));

			expect(newItemsInCart.length).toEqual(1);
			const remainingItem = newItemsInCart.pop();
			expect(remainingItem?.product).toEqual(product1);
		});
	});
});
