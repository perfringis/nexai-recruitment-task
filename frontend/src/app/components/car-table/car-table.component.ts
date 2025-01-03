import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'car-table',
  imports: [ButtonComponent, DialogComponent, CommonModule],
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.scss',
})
export class CarTableComponent {
  @Input() header!: string[];
  @Input() cars!: Car[];

  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(private router: Router, private carService: CarService) {}

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
        this.showSuccessDialog = true;
      },
      (error) => {
        this.showErrorDialog = true;
      }
    );
  }

  public closeSuccessDialog(): void {
    this.showSuccessDialog = false;
  }

  public closeErrorDialog(): void {
    this.showErrorDialog = false;
  }
}
