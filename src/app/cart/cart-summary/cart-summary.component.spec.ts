import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartSummaryComponent } from './cart-summary.component';
import { provideSignalsStore } from '../service/signals-implementation/cart-signals.service';
import { provideRouter } from '@angular/router';

describe('CartSummaryComponent', () => {
	let component: CartSummaryComponent;
	let fixture: ComponentFixture<CartSummaryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CartSummaryComponent],
			providers: [
				provideRouter([]),
				provideSignalsStore(),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CartSummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
