import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, InjectionToken, linkedSignal, signal } from '@angular/core';
import { UserThemePreferencesService } from './user-theme-preferences.service';

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
	private userThemePreferencesService = inject(UserThemePreferencesService);
	private isDarkTheme = linkedSignal<boolean>(() => !this.userThemePreferencesService.prefersLightTheme());
	
	public themeDetails = computed(() => this.getThemeDetails(this.isDarkTheme()));

	constructor() {
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
