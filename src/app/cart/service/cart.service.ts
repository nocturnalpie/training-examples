import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../cart-item';
import { Product } from '../../products/product';

export const SHIPPING = 3.98;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsInCart = signal<CartItem[]>([]);

  subtotal = computed(() =>
    this.itemsInCart().reduce((total, item) => total + item.totalPrice(), 0)
  );

  deliveryFee = computed(() => (this.subtotal() > 50 ? 0 : SHIPPING));

  total = computed(() => {
    console.log(this.deliveryFee());
    console.log(this.subtotal());
    console.log(3.99 + 20);
    return this.deliveryFee() + this.subtotal();
  });

  totalQuantity = computed(() =>
    this.itemsInCart().reduce(
      (totalQuantity, item) => totalQuantity + item.quantity,
      0
    )
  );

  addItem(itemToAdd: Product): void {
    const itemInCart = this.findProduct(itemToAdd);

    if (itemInCart) {
      this.increaseItemQuantity(itemInCart);
    } else {
      this.itemsInCart.update((cartItems) => [
        ...cartItems,
        new CartItem(itemToAdd),
      ]);
    }
  }

  increaseItemQuantity(itemToUpdate: CartItem) {
    this.itemsInCart.update((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.product.id === itemToUpdate.product.id
          ? new CartItem(itemToUpdate.product, cartItem.quantity + 1)
          : cartItem
      )
    );
  }

  decreaseItemQuantity(itemToUpdate: CartItem) {
    if (itemToUpdate.quantity === 1) {
      this.removeItem(itemToUpdate);
    } else {
      this.itemsInCart.update((cartItems) =>
        cartItems.map((cartItem) =>
          cartItem.product.id === itemToUpdate.product.id
            ? new CartItem(itemToUpdate.product, cartItem.quantity - 1)
            : cartItem
        )
      );
    }
  }

  removeItem(itemToRemove: CartItem): void {
    this.itemsInCart.update((cartItems) =>
      cartItems.filter(
        (cartItem) => cartItem.product.id != itemToRemove.product.id
      )
    );
  }

  private findProduct(item: Product): CartItem | undefined {
    return this.itemsInCart().find(
      (itemInCart) => itemInCart.product.id === item.id
    );
  }
}
