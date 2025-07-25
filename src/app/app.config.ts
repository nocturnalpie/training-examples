import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import 'zone.js';
import { AppComponent } from './app.component';
import { ROUTES } from './routes';
import { TemplatePageTitleStrategy } from './title.strategy';

/* Choose an implementation here */
// import { provideNgRxStore } from './app/cart/service/ngRx-implementation/cart-ngrx.service';
import { provideSignalsStore } from './cart/service/signals-implementation/cart-signals.service';

export const STORE_NAME = 'Toy Shop';

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(ROUTES, withComponentInputBinding()),
		provideAnimationsAsync(),
		{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy },

		/* Choose an implementation here */
		provideSignalsStore(),
		// provideNgRxStore(),
	],
});

