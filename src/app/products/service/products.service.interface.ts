import { InjectionToken, Signal } from '@angular/core';
import { ProductDetails, ProductSummary } from '../product.interface';

export const ProductsService = new InjectionToken<IProductsService>('Cart Service Interface');

export interface IProductsService {
	getProductsSummary(): Signal<ProductSummary[]>;
	getProductDetails(id: number): Signal<ProductDetails | undefined>;
}