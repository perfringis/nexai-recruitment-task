import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Car } from '../../models/car.model';
import { VINValidator } from '../../validators/vin.validator';
import { LicensePlateValidator } from '../../validators/license.plate.validator';

@Component({
  selector: 'car-edit-form',
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './car-edit-form.component.html',
  styleUrl: './car-edit-form.component.scss',
})
export class CarEditForm implements OnInit {
  @Input() car!: Car;
  @Output() submit = new EventEmitter<void>();

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
      this.submit.emit(this.formGroup.value);
    }
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
