import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ThemeModeService } from './theme-mode.service';
import { UserThemePreferencesService } from './user-theme-preferences.service';

describe('ThemeModeService', () => {
	let service: ThemeModeService;
	let preferredTheme = signal<boolean | undefined>(true);

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ThemeModeService);
		TestBed.inject(UserThemePreferencesService).prefersLightTheme = preferredTheme.asReadonly();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('theme preferences', () => {
		it('should be dark mode when user does not prefer light mode', () => {
			givenUserPrefersTheme('dark');

			expect(service.themeDetails().class).toContain('dark');
		});

		it('should be light mode when user prefers light mode', () => {
			givenUserPrefersTheme('light');

			expect(service.themeDetails().class).toContain('light');
		});

		it('should be dark mode when no preference available', () => {
			givenHasNoThemePreference();

			expect(service.themeDetails().class).toContain('dark');
		});
	});

	describe('toggleThemeMode', () => {
		it('should return the details of light mode when toggled from dark mode', () => {
			givenUserPrefersTheme('dark');

			service.toggleThemeMode();

			expect(service.themeDetails().class).toContain('light');
		});

		it('should return the details of dark mode when toggled from light mode', () => {
			givenUserPrefersTheme('light');

			service.toggleThemeMode();

			expect(service.themeDetails().class).toContain('dark');
		});
	});

	describe('theme preference change', () => {
		it('should be light when user prefers dark then changes preference to light', () => {
			givenUserPrefersTheme('dark');
			expect(service.themeDetails().class).toContain('dark');

			givenUserPrefersTheme('light');
			expect(service.themeDetails().class).toContain('light');
		});

		it('should be dark when user prefers light then changes preference to dark', () => {
			givenUserPrefersTheme('light');
			expect(service.themeDetails().class).toContain('light');

			givenUserPrefersTheme('dark');
			expect(service.themeDetails().class).toContain('dark');
		});
	});

	const givenUserPrefersTheme = (theme: 'dark' | 'light') => {
		preferredTheme.set(theme === 'light');
	}

	const givenHasNoThemePreference = () => {
		preferredTheme.set(undefined);
	}
});
