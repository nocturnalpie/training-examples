import { computed, EnvironmentProviders, Injectable, makeEnvironmentProviders, Signal, signal } from '@angular/core';
import { ProductDetails, ProductSummary } from '../../product.interface';
import { IProductsService, ProductsService } from '../products.service.interface';

const PRODUCTS: ProductSummary[] = [
	{ id: 1, name: 'Car', price: 10 },
	{ id: 2, name: 'Xylophone', price: 50 },
	{ id: 3, name: 'Teddy', price: 5 },
	{ id: 4, name: 'Train', price: 7 },
	{ id: 5, name: 'Squishmallow', price: 6 },
	{ id: 6, name: 'Helicopter', price: 30 },
	{ id: 7, name: 'Tamagotchi', price: 25 },
];

@Injectable()
class MockProductsService implements IProductsService {
	getProductsSummary(): Signal<ProductSummary[]> {
		return signal(PRODUCTS).asReadonly();
	}

	getProductDetails(id: number): Signal<ProductDetails | undefined> {
		console.log(typeof id)
		console.log(PRODUCTS.find(product => product.id === id))
		return computed(() => PRODUCTS.find(product => product.id === id));
	}
}

export const provideMockProductsService = (): EnvironmentProviders => makeEnvironmentProviders([
	{ provide: ProductsService, useClass: MockProductsService }
]);
