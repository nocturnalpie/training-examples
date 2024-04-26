import { computed } from '@angular/core';
import { Product } from '../products/product';

export class CartItem {
  totalPrice = computed(() => this.product.price * this.quantity);

  constructor(public product: Product, public quantity: number = 1) {}
}
