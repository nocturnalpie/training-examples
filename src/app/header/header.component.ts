import { Component, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart/service/cart.service.interface';

@Component({
	selector: 'app-header',
	imports: [
		CartComponent,
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
		this.cart.itemAdded
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.menuTrigger()?.openMenu());
	}
}
