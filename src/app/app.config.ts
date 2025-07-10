import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TitleStrategy, provideRouter } from '@angular/router';
import 'zone.js';
import { AppComponent } from './app.component';

/* Choose an implementation here */
// import { provideNgRxStore } from './app/cart/service/ngRx-implementation/cart-ngrx.service';
import { provideSignalsStore } from './cart/service/signals-implementation/cart-signals.service';
import { ROUTES } from './routes';
import { TemplatePageTitleStrategy } from './title.strategy';

export const STORE_NAME = 'Toy Store';

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(ROUTES),
		provideAnimationsAsync(),
		{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy },

		/* Choose an implementation here */
		provideSignalsStore(),
		// provideNgRxStore(),
	],
});

