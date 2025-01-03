import { Component } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { CarTableComponent } from '../../components/car-table/car-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../components/custom-dialog/custom-dialog.component';

@Component({
  selector: 'car-page',
  imports: [CarTableComponent],
  templateUrl: './car.page.html',
  styleUrl: './car.page.scss',
})
export class CarPage {
  header = ['VIN', 'Brand', 'License plate', 'Status', 'Edit', 'Delete'];
  cars: Car[] = [];

  constructor(private carService: CarService, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.carService.getCars().subscribe(
      (cars) => {
        this.cars = cars;
      },
      (error) => {
        this.openDialog({
          title: 'Error',
          message: error.error.message,
        });
      }
    );
  }

  public openDialog(data: { title: string; message: string }) {
    this.dialog.open(CustomDialogComponent, {
      data,
    });
  }
}
