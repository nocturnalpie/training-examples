import { Component, computed, inject, input } from '@angular/core';
import { ProductsService } from '../service/products.service.interface';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrl: './product-details.component.scss',
	imports: [JsonPipe],
})
export class ProductDetailsComponent {
	id = input.required<string>()
	private productsService =  inject(ProductsService)
	protected product = computed(() => this.productsService.getProductDetails(Number(this.id()))());
}
