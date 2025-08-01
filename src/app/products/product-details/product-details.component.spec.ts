import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { provideMockProductsService } from '../service/mock-data.implementation/mock-product-service';

describe('ProductDetailsComponent', () => {
	let component: ProductDetailsComponent;
	let fixture: ComponentFixture<ProductDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProductDetailsComponent],
			providers: [
				provideMockProductsService(),
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ProductDetailsComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('id', 1)
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
