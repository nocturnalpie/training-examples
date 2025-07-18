import { Component, effect, inject, viewChild } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CartSummaryComponent } from '../cart/cart-summary/cart-summary.component';
import { CartService } from '../cart/service/cart.service.interface';

@Component({
	selector: 'app-header',
	imports: [
		CartSummaryComponent,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		MatMenuModule,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	protected readonly cart = inject(CartService);
	private menuTrigger = viewChild<MatMenuTrigger>(MatMenuTrigger);

	constructor() {
		this.cart.itemAdded.subscribe(() => this.menuTrigger()?.openMenu());
	}
}
