import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
	selector: 'app-root',
	imports: [
		RouterModule,
		HeaderComponent,
	],
	templateUrl: './app.component.html',
})
export class AppComponent {
}
