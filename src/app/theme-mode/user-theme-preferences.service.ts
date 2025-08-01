import { computed, inject, Injectable, Signal } from "@angular/core";
import { WINDOW } from "./theme-mode.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { fromEvent, tap, startWith, map } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class UserThemePreferencesService {
	private window = inject(WINDOW);

	public prefersLightTheme = computed(() => {
		const prefersLightColorSchemeMediaQuery = this.window.matchMedia('(prefers-color-scheme: light)');
		return toSignal(
			fromEvent<MediaQueryList>(prefersLightColorSchemeMediaQuery, 'change')
				.pipe(
					startWith(prefersLightColorSchemeMediaQuery),
					map((query: MediaQueryList) => query.matches)
				)
		)();
	});
}