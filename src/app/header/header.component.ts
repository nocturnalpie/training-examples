import { Component, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart/service/cart.service.interface';
import { ThemeModeService } from '../theme-mode/theme-mode.service';

@Component({
	selector: 'app-header',
	imports: [
		CartComponent,
		MatToolbar,
		MatButton,
		MatIconButton,
		MatIcon,
		MatBadge,
		MatMenu,
		MatMenuTrigger,
		MatTooltip,
		RouterLink,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	protected readonly cart = inject(CartService);

	private readonly themeModeService = inject(ThemeModeService);
	protected themeDetails = this.themeModeService.themeDetails;

	private menuTrigger = viewChild<MatMenuTrigger>(MatMenuTrigger);

	constructor() {
		this.cart.itemAdded
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.menuTrigger()?.openMenu());
	}

	public toggleThemeMode(): void {
		this.themeModeService.toggleThemeMode();
	}
}
