import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { CartService, ICartService } from './cart/service/cart.service.interface';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [
				provideRouter([]),
				{
					provide: CartService, useValue: jasmine.createSpyObj<ICartService>(
						['addItem', 'increaseItemQuantity', 'decreaseItemQuantity', 'removeItem']
					)
				},
			]
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
