import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartSummaryComponent } from './cart-summary.component';
import { CartService, ICartService } from '../service/cart.service.interface';

describe('CartSummaryComponent', () => {
	let component: CartSummaryComponent;
	let fixture: ComponentFixture<CartSummaryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CartSummaryComponent],
			providers: [
				{ provide: CartService, useValue: jasmine.createSpyObj<ICartService>([]) },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(CartSummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
