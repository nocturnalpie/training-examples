import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { provideRouter } from '@angular/router';
import { CartService, ICartService } from './service/cart.service.interface';

describe('CartComponent', () => {
	let component: CartComponent;
	let fixture: ComponentFixture<CartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CartComponent],
			providers: [
				provideRouter([]),
				{
					provide: CartService, useValue: jasmine.createSpyObj<ICartService>(
						['addItem', 'increaseItemQuantity', 'decreaseItemQuantity', 'removeItem']
					)
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
