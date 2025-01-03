import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../components/custom-dialog/custom-dialog.component';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VINValidator } from '../../validators/vin.validator';
import { LicensePlateValidator } from '../../validators/license.plate.validator';

@Component({
  selector: 'car-edit-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './car-edit.page.html',
  styleUrl: './car-edit.page.scss',
})
export class CarEditPage implements OnInit {
  car!: Car;
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private carService: CarService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['car']) {
      this.car = navigation.extras.state['car'];
    }
  }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      vin: [
        this.car.vin,
        {
          validators: [Validators.required, VINValidator()],
        },
      ],
      brand: [
        this.car.brand,
        {
          validators: [Validators.required],
        },
      ],
      licensePlate: [
        this.car.licensePlate,
        {
          validators: [Validators.required, LicensePlateValidator()],
        },
      ],
    });
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.carService.editCar(this.car).subscribe(
        (car) => {
          this.openDialog({
            title: 'Success',
            message: 'Car edited successfully!',
          });
          this.router.navigate(['/car']);
        },
        (error) => {
          this.openDialog({
            title: 'Error',
            message: error.error.message,
          });
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public openDialog(data: { title: string; message: string }) {
    this.dialog.open(CustomDialogComponent, {
      data,
    });
  }

  get vin(): FormControl {
    return this.formGroup.get('vin') as FormControl;
  }

  get brand(): FormControl {
    return this.formGroup.get('brand') as FormControl;
  }

  get licensePlate(): FormControl {
    return this.formGroup.get('licensePlate') as FormControl;
  }
}
