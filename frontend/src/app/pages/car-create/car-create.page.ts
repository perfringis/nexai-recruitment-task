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

@Component({
  selector: 'car-create-page',
  imports: [
    CommonModule,
    HeaderComponent,
    DialogComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './car-create.page.html',
  styleUrl: './car-create.page.scss',
})
export class CarCreatePage {
  showDialog = false;
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private carService: CarService,
    private fb: FormBuilder
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
          this.showDialog = true;
        },
        (error) => {
          console.error('Error creating car:', error);
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public closeDialog(): void {
    this.showDialog = false;
    this.router.navigate(['/car']);
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
