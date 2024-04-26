import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.scss',
})
export class EmptyCartComponent {}
