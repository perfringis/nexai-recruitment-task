import { Component } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { CarTableComponent } from '../../components/car-table/car-table.component';

@Component({
  selector: 'car-page',
  imports: [CarTableComponent],
  templateUrl: './car.page.html',
  styleUrl: './car.page.scss',
})
export class CarPage {
  header = ['VIN', 'Brand', 'License plate', 'Status', 'Edit', 'Delete'];
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  public ngOnInit(): void {
    this.carService.getCars().subscribe(
      (cars) => {
        this.cars = cars;
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }
}
