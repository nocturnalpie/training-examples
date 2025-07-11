import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { CartService } from './service/cart.service.interface';

@Component({
	selector: 'app-cart',
	imports: [
		MatListModule,
		MatButtonModule,
		MatIconModule,
		RouterModule,
		EmptyCartComponent,
	],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss'
})
export class CartComponent {
	protected readonly cart = inject(CartService);
	protected readonly title = input();
}
