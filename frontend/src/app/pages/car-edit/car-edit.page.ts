import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { CarEditForm } from '../../components/car-edit-form/car-edit-form.component';

@Component({
  selector: 'car-edit-page',
  imports: [
    DialogComponent,
    CarEditForm,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './car-edit.page.html',
  styleUrl: './car-edit.page.scss',
})
export class CarEditPage {
  car!: Car;
  showDialog = false;

  constructor(
    private router: Router,
    private carService: CarService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['car']) {
      this.car = navigation.extras.state['car'];
    }
  }

  public onSubmit(): void {
    this.carService.editCar(this.car).subscribe(
      (car) => {
        this.showDialog = true;
      },
      (error) => {
        console.error('Error editing car:', error);
      }
    );
  }

  public closeDialog(): void {
    this.showDialog = false;
    this.router.navigate(['/car']);
  }
}
