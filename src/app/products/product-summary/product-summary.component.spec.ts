import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSummaryComponent } from './product-summary.component';

describe('ProductSummaryComponent', () => {
	let fixture: ComponentFixture<ProductSummaryComponent>;
	let component: ProductSummaryComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProductSummaryComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ProductSummaryComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('product', { id: 1, name: 'item 1', price: 20 })
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
