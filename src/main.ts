import { Component, InjectionToken } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import 'zone.js';
import { CartComponent } from './app/cart/cart.component';
import { CartNgrxService, NGRX_STATE_PROVIDERS } from './app/cart/service/ngRx-implementation/cart-ngrx.service';
import { HomeComponent } from './app/home/home.component';
import { ProductsComponent } from './app/products/products.component';
import { CartSignalsService } from './app/cart/service/signals-implementation/cart-signals.service';
import { ICartService } from './app/cart/service/cart.service.interface';

const ROUTES: Routes = [
	{
		path: '',
		component: ProductsComponent,
	},
	{
		path: 'cart',
		component: CartComponent,
	},
];

export const CartService = new InjectionToken<ICartService>('Cart Service Interface');

@Component({
	selector: 'app-root',
	standalone: true,
	template: `<app-home>`,
	imports: [RouterModule, HomeComponent, ProductsComponent, CartComponent],
})
export class App {
	name = 'Angular';
}

bootstrapApplication(App, {
	providers: [
		provideRouter(ROUTES),
		provideAnimationsAsync(),
		...NGRX_STATE_PROVIDERS,

		/* Choose an implementation here */
		{ provide: CartService, useClass: CartSignalsService }
		// { provide: CartService, useClass: CartNgrxService }
	],
});

