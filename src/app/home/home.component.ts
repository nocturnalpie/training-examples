import { Component, Inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CartSummaryComponent } from '../cart/cart-summary/cart-summary.component';
import { CartService, ICartService } from '../cart/service/cart.service.interface';

@Component({
	selector: 'app-home',
	imports: [
		CartSummaryComponent,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		MatMenuModule,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	constructor(@Inject(CartService) public readonly cart: ICartService) { }
}
