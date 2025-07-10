import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import 'zone.js';
import { CartComponent } from './app/cart/cart.component';
import { HomeComponent } from './app/home/home.component';
import { ProductsComponent } from './app/products/product-list/products.component';

/* Choose an implementation here */
// import { provideNgRxStore } from './app/cart/service/ngRx-implementation/cart-ngrx.service';
import { provideSignalsStore } from './app/cart/service/signals-implementation/cart-signals.service';

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


@Component({
	selector: 'app-root',
	template: `<app-home>`,
	imports: [RouterModule, HomeComponent]
})
export class App {
	name = 'Angular';
}

bootstrapApplication(App, {
	providers: [
		provideRouter(ROUTES),
		provideAnimationsAsync(),

		/* Choose an implementation here */
		provideSignalsStore(),
		// provideNgRxStore(),
	],
});

