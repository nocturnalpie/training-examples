import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartService, ICartService } from './service/cart.service.interface';

describe('CartComponent', () => {
	let component: CartComponent;
	let fixture: ComponentFixture<CartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CartComponent],
			providers: [
				provideRouter([]),
				{provide: CartService, useValue: jasmine.createSpyObj<ICartService>(['totalQuantity'])},
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
