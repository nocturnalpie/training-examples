import { Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { ProductsComponent } from "./products/product-list/products.component";

export const ROUTES: Routes = [
	{
		path: '',
		component: ProductsComponent,
		title: 'Products',
		data: {
			title: 'Products'
		},
	},
	{
		path: 'cart',
		component: CartComponent,
		title: 'Cart',
		data: {
			title: 'Cart'
		},
	},
];