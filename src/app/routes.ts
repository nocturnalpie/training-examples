import { Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { ProductsComponent } from "./products/product-list/products.component";
import { ProductDetailsComponent } from "./products/product-details/product-details.component";

export const ROUTES: Routes = [
	{
		path: 'products',
		children: [
			{
				path: '',
				component: ProductsComponent,
				title: 'Products',
				data: { title: 'Products' },
			},
			{
				path: ':id',
				component: ProductDetailsComponent,
			}
		]
	},
	{
		path: 'cart',
		component: CartComponent,
		title: 'Cart',
		data: {
			title: 'Cart'
		},
	},
	{ path: '**', redirectTo: 'products', }
];