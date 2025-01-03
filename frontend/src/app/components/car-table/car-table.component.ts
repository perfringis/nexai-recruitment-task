import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'car-table',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.scss',
})
export class CarTableComponent {
  @Input() header!: string[];
  @Input() cars!: Car[];

  constructor(
    private router: Router,
    private carService: CarService,
    private dialog: MatDialog
  ) {}

  public createCar(): void {
    this.router.navigate(['/car/new']);
  }

  public editCar(car: Car): void {
    this.router.navigate([`/car/edit/${car.vin}`], {
      state: { car },
    });
  }

  public deleteCar(vin: string): void {
    this.carService.deleteCar(vin).subscribe(
      () => {
        this.cars = this.cars.filter((car) => car.vin !== vin);
        this.openDialog({
          title: 'Success',
          message: 'Car created successfully!',
        });
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
