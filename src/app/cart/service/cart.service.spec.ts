import { TestBed } from '@angular/core/testing';
import { CartItem } from '../cart-item';
import { CartService, SHIPPING } from './cart.service';
import { Product } from '../../products/product';

describe('CartService', () => {
  let service: CartService;
  const product1: Product = { id: 1, name: '', price: 10 };
  const product2: Product = { id: 2, name: '', price: 14 };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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
        service.itemsInCart.set(testCase.itemsInCart);

        expect(service.total()).toEqual(testCase.expectedTotal);
      });
    });
  });

  describe('add item', () => {
    it('should add new items to the list of items with quantity 1', () => {
      service.itemsInCart.set([]);

      service.addItem(product1);

      const addedItem = service.itemsInCart().pop();
      expect(addedItem?.product).toEqual(product1);
      expect(addedItem?.quantity).toEqual(1);
    });

    it('should increase the quantity by 1 when adding existing items', () => {
      const startingQuantity = 2;
      service.itemsInCart.set([new CartItem(product1, startingQuantity)]);

      service.addItem(product1);

      expect(service.itemsInCart().length).toEqual(1);
      const addedItem = service.itemsInCart().pop();
      expect(addedItem?.product).toEqual(product1);
      expect(addedItem?.quantity).toEqual(startingQuantity + 1);
    });
  });

  describe('increase item quantity', () => {
    it('should increase the quantitiy of the given item by 1', () => {
      const startingQuantity = 2;
      const itemToIncrease = new CartItem(product1, startingQuantity);
      service.itemsInCart.set([itemToIncrease]);

      service.increaseItemQuantity(itemToIncrease);

      expect(service.itemsInCart().length).toEqual(1);
      const addedItem = service.itemsInCart().pop();
      expect(addedItem?.product).toEqual(product1);
      expect(addedItem?.quantity).toEqual(startingQuantity + 1);
    });

    it('should not add items not already in the list', () => {
      service.itemsInCart.set([new CartItem(product1)]);

      service.increaseItemQuantity(new CartItem(product2));

      const updatedItem = service
        .itemsInCart()
        .find((cartItem) => cartItem.product.id === product2.id);
      expect(updatedItem).toBeUndefined();
    });
  });

  describe('decrease item quantity', () => {
    it('should decrease the quantitiy of the given item by 1', () => {
      const startingQuantity = 2;
      const itemToIncrease = new CartItem(product1, startingQuantity);
      service.itemsInCart.set([itemToIncrease]);

      service.decreaseItemQuantity(itemToIncrease);

      expect(service.itemsInCart().length).toEqual(1);
      const addedItem = service.itemsInCart().pop();
      expect(addedItem?.product).toEqual(product1);
      expect(addedItem?.quantity).toEqual(startingQuantity - 1);
    });

    it('should remove items that have a quantity of 1', () => {
      service.itemsInCart.set([new CartItem(product1)]);

      service.decreaseItemQuantity(new CartItem(product1));

      expect(service.itemsInCart().length).toEqual(0);
    });
  });

  describe('remove item', () => {
    it('should remove the given item from the cart', () => {
      const itemToRemove = new CartItem(product1);
      service.itemsInCart.set([itemToRemove]);

      service.removeItem(itemToRemove);

      expect(service.itemsInCart().length).toEqual(0);
    });

    it('should only remove the given item from the cart', () => {
      service.itemsInCart.set([new CartItem(product1)]);

      service.removeItem(new CartItem(product2));

      expect(service.itemsInCart().length).toEqual(1);
      const remainingItem = service.itemsInCart().pop();
      expect(remainingItem?.product).toEqual(product1);
    });
  });
});
