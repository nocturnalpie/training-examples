export interface ProductSummary {
	id: number;
	name: string;
	price: number;
}

export interface ProductDetails extends ProductSummary {
	id: number;
	name: string;
	price: number;
}
