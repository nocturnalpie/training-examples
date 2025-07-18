import { Component, input } from '@angular/core';

@Component({
	selector: 'app-product',
	imports: [],
	templateUrl: './product.component.html',
	styleUrl: './product.component.scss'
})
export class ProductComponent {
	id = input.required<number>()

}
