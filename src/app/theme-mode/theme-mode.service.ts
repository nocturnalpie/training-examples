import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, startWith, tap } from 'rxjs';

export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window
});

export type ThemeDetails = {
	class: string,
	icon: string,
	helpText: string,
}

export const THEMES: { [themeName: string]: ThemeDetails } = {
	dark: {
		class: 'dark-mode',
		icon: 'light_mode',
		helpText: 'Switch to light theme'
	},
	light: {
		class: 'light-mode',
		icon: 'dark_mode',
		helpText: 'Switch to dark theme'
	},
}

@Injectable({
	providedIn: 'root'
})
export class ThemeModeService {
	private document = inject(DOCUMENT);
	private window = inject(WINDOW);
	private isDarkTheme = signal(true);
	
	public themeDetails = computed(() => this.getThemeDetails(this.isDarkTheme()));

	constructor() {
		const prefersLightColorSchemeMediaQuery = this.window.matchMedia('(prefers-color-scheme: light)');
		const prefersLightColorScheme = toSignal(
			fromEvent<MediaQueryList>(prefersLightColorSchemeMediaQuery, 'change')
				.pipe(
					tap(query => console.log(query)),
					startWith(prefersLightColorSchemeMediaQuery),
					map((query: MediaQueryList) => query.matches)
				)
		);

		effect(() => {
			this.isDarkTheme.set(!prefersLightColorScheme())
		});

		effect(() => {
			this.document.body.classList.add(this.getThemeDetails(this.isDarkTheme()).class);
			this.document.body.classList.remove(this.getThemeDetails(!this.isDarkTheme()).class);
		})
	}

	public toggleThemeMode(): void {
		this.isDarkTheme.set(!this.isDarkTheme());
	}

	private getThemeDetails(isDarkTheme: boolean): ThemeDetails {
		return isDarkTheme ? THEMES['dark'] : THEMES['light']
	}
}
