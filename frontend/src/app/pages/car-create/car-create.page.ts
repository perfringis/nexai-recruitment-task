import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarService } from '../../services/car.service';
import { VINValidator } from '../../validators/vin.validator';
import { LicensePlateValidator } from '../../validators/license.plate.validator';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../components/custom-dialog/custom-dialog.component';

@Component({
  selector: 'car-create-page',
  imports: [
    CommonModule,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './car-create.page.html',
  styleUrl: './car-create.page.scss',
})
export class CarCreatePage {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private carService: CarService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      vin: [
        '',
        {
          validators: [Validators.required, VINValidator()],
        },
      ],
      brand: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      licensePlate: [
        '',
        {
          validators: [Validators.required, LicensePlateValidator()],
        },
      ],
    });
  }

  public onSubmit(event: Event): void {
    event.preventDefault();

    if (this.formGroup.valid) {
      this.carService.createCar(this.formGroup.value).subscribe(
        () => {
          this.openDialog({
            title: 'Success',
            message: 'Car created successfully!',
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
