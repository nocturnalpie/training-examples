import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProductSummary } from '../product.interface';

@Component({
	selector: 'app-product-summary',
	imports: [MatCardModule, MatButtonModule, MatIcon],
	templateUrl: './product-summary.component.html',
	styleUrl: './product-summary.component.scss'
})
export class ProductSummaryComponent {
	public product = input.required<ProductSummary>();

	public clickAddToCart = output();

	private readonly router = inject(Router);
	protected goToProduct() {
		this.router.navigate(['products', this.product().id])
	}
}
