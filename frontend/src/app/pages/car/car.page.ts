import { Component } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { CarTableComponent } from '../../components/car-table/car-table.component';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'car-page',
  imports: [CarTableComponent],
  templateUrl: './car.page.html',
  styleUrl: './car.page.scss',
})
export class CarPage {
  header = ['VIN', 'Brand', 'License plate', 'Status', 'Edit', 'Delete', 'Rent/Return'];
  cars: Car[] = [];

  constructor(
    private carService: CarService,
    private dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.carService.getCars().subscribe(
      (cars) => {
        this.cars = cars;
      },
      (error) => {
        this.dialogService.openDialog({
          title: 'Error',
          message: error.error.message,
        });
      }
    );
  }
}
