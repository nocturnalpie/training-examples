import { Component, computed, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';
import { CartSummaryComponent } from '../cart/cart-summary/cart-summary.component';
import { CartService } from '../cart/service/cart.service.interface';

@Component({
	selector: 'app-header',
	imports: [
		CartSummaryComponent,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		MatMenuModule,
		RouterModule,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	
	protected readonly cart = inject(CartService);
	protected pageTitle = computed(() => this.routeData()?.['title']);
	
	constructor() {
		this.cart.itemAdded
		.pipe(takeUntilDestroyed())
		.subscribe(() => this.menuTrigger()?.openMenu());
	}
	
	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);
	private menuTrigger = viewChild<MatMenuTrigger>(MatMenuTrigger);
	
	private routeData = toSignal(this.router.events.pipe(
		filter(e => e instanceof NavigationEnd),
		switchMap(() => this.getChildOrRouteData(this.activatedRoute)),
	));

	private getChildOrRouteData(route: ActivatedRoute): Observable<Data> {
		return route.firstChild ? this.getChildOrRouteData(route.firstChild) : route.data;
	}
}
