import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rental } from '../../models/rental.model';

@Component({
  selector: 'rental-table',
  imports: [CommonModule],
  templateUrl: './rental-table.component.html',
  styleUrl: './rental-table.component.scss',
})
export class RentalTableComponent {
  @Input() header!: string[];
  @Input() rentals!: Rental[];
}
