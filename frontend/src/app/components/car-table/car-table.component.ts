import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { DialogService } from '../../services/dialog.service';
import { RentalService } from '../../services/rental.service';

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
    private rentalService: RentalService,
    private dialogService: DialogService
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
        this.dialogService.openDialog({
          title: 'Success',
          message: 'Car deleted successfully!',
        });
      },
      (error) => {
        this.dialogService.openDialog({
          title: 'Error',
          message: error.error.message,
        });
      }
    );
  }

  public returnCar(vin: string): void {
    this.rentalService.returnCar(vin).subscribe(
      () => {
        this.dialogService.openDialog(
          {
            title: 'Success',
            message: 'Car returned successfully!',
          },
          () => {
            this.router.navigate(['/car']);
          }
        );
      },
      (error) => {
        this.dialogService.openDialog({
          title: 'Error',
          message: error.error.message,
        });
      }
    );
  }

  public rentCar(car: Car): void {
    this.router.navigate(['/rental/new'], {
      state: { car },
    });
  }
}
