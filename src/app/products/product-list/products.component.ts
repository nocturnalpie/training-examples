import { Component, inject } from '@angular/core';
import { CartService } from '../../cart/service/cart.service.interface';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { ProductsService } from '../service/products.service.interface';

@Component({
	selector: 'app-products',
	imports: [ProductSummaryComponent],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss',
})
export class ProductsComponent {
	protected readonly cart = inject(CartService);
	protected readonly products = inject(ProductsService).getProductsSummary();
}
