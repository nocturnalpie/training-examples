import { Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { ProductsComponent } from "./products/product-list/products.component";
import { ProductComponent } from "./products/product/product.component";

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
				component: ProductComponent,
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