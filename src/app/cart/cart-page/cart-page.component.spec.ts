import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideSignalsStore } from '../service/signals-implementation/cart-signals.service';
import { CartPageComponent } from './cart-page.component';

describe('CartPageComponent', () => {
	let component: CartPageComponent;
	let fixture: ComponentFixture<CartPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CartPageComponent],
			providers: [provideSignalsStore()],
		})
			.compileComponents();

		fixture = TestBed.createComponent(CartPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
