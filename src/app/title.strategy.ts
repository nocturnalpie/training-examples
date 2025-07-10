import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { STORE_NAME } from './app.config';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
	private readonly titleService = inject(Title);

	override updateTitle(routerState: RouterStateSnapshot) {
		const pageTitle = this.buildTitle(routerState);
		if (pageTitle !== undefined) {
			this.titleService.setTitle(`${ pageTitle } | ${STORE_NAME}`);
		} else {
			this.titleService.setTitle(STORE_NAME);
		}
	}
}