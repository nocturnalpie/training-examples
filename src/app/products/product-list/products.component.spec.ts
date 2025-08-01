import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideSignalsStore } from '../../cart/service/signals-implementation/cart-signals.service';
import { provideMockProductsService } from '../service/mock-data.implementation/mock-product-service';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
	let component: ProductsComponent;
	let fixture: ComponentFixture<ProductsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProductsComponent],
			providers: [
				provideSignalsStore(),
				provideMockProductsService(),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ProductsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
