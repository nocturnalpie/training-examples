import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { ProductsComponent } from './app/products/products.component';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './app/home/home.component';
import { CartComponent } from './app/cart/cart.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-home>`,
  imports: [RouterModule, HomeComponent, ProductsComponent, CartComponent],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideRouter(ROUTES), provideAnimationsAsync()],
});
