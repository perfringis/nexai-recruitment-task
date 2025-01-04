import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
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
import { PostalCodeValidator } from '../../validators/postal.code.validator';
import { TextValidator } from '../../validators/text.validator';
import { NumberValidator } from '../../validators/number.validator';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'customer-create-page',
  imports: [
    CommonModule,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-create.page.html',
  styleUrl: './customer-create.page.scss',
})
export class CustomerCreatePage {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: [
        '',
        {
          validators: [Validators.required, TextValidator()],
        },
      ],
      lastName: [
        '',
        {
          validators: [Validators.required, TextValidator()],
        },
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      address: this.fb.group({
        street: [
          '',
          {
            validators: [Validators.required],
          },
        ],
        buildingNumber: [
          '',
          {
            validators: [Validators.required, NumberValidator()],
          },
        ],
        city: [
          '',
          {
            validators: [Validators.required, TextValidator()],
          },
        ],
        country: [
          '',
          {
            validators: [Validators.required, TextValidator()],
          },
        ],
        postalCode: [
          '',
          {
            validators: [Validators.required, PostalCodeValidator()],
          },
        ],
      }),
    });
  }

  public onSubmit(event: Event): void {
    event.preventDefault();

    if (this.formGroup.valid) {
      this.customerService.createCustomer(this.formGroup.value).subscribe(
        () => {
          this.dialogService.openDialog(
            {
              title: 'Success',
              message: 'Customer created successfully!',
            },
            () => {
              this.router.navigate(['/customer']);
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
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  get firstName(): FormControl {
    return this.formGroup.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.formGroup.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get street(): FormControl {
    return this.formGroup.get('address.street') as FormControl;
  }

  get buildingNumber(): FormControl {
    return this.formGroup.get('address.buildingNumber') as FormControl;
  }

  get city(): FormControl {
    return this.formGroup.get('address.city') as FormControl;
  }

  get country(): FormControl {
    return this.formGroup.get('address.country') as FormControl;
  }

  get postalCode(): FormControl {
    return this.formGroup.get('address.postalCode') as FormControl;
  }
}
