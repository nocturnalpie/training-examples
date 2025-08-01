import { computed, inject, Injectable, Signal } from "@angular/core";
import { WINDOW } from "./theme-mode.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { fromEvent, tap, startWith, map } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class UserThemePreferencesService {
	private readonly window = inject(WINDOW);
	private readonly prefersLightColorSchemeMediaQuery = this.window.matchMedia('(prefers-color-scheme: light)');

	public prefersLightTheme = toSignal(
		fromEvent<MediaQueryList>(this.prefersLightColorSchemeMediaQuery, 'change')
			.pipe(
				startWith(this.prefersLightColorSchemeMediaQuery),
				map((query: MediaQueryList) => query.matches)
			)
	);
}