import { Component, Input } from '@angular/core';
import { Car } from '../../models/car.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'car-rental-table',
  imports: [CommonModule],
  templateUrl: './car-rental-table.component.html',
  styleUrl: './car-rental-table.component.scss'
})
export class CarRentalTableComponent {
  @Input() header!: string[];
  @Input() car!: Car;
}
