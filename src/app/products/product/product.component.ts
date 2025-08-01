import { Component, input } from '@angular/core';
import { Product } from '../product.interface';

@Component({
	selector: 'app-product',
	imports: [],
	templateUrl: './product.component.html',
	styleUrl: './product.component.scss'
})
export class ProductComponent {
	public product = input.required<Product>();
}
