import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap, Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	styleUrl: './app.component.scss',
	templateUrl: './app.component.html',
	imports: [
		RouterModule,
		HeaderComponent,
	],
})
export class AppComponent {
	protected pageTitle = computed(() => this.routeData()?.['title']);
	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);

	private routeData = toSignal(this.router.events.pipe(
		filter(e => e instanceof NavigationEnd),
		switchMap(() => this.getChildOrRouteData(this.activatedRoute)),
	));

	private getChildOrRouteData(route: ActivatedRoute): Observable<Data> {
		return route.firstChild ? this.getChildOrRouteData(route.firstChild) : route.data;
	}
}
