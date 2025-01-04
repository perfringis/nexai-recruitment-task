import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
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
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { DialogService } from '../../services/dialog.service';
import { TextValidator } from '../../validators/text.validator';
import { NumberValidator } from '../../validators/number.validator';
import { PostalCodeValidator } from '../../validators/postal.code.validator';
import { Customer } from '../../models/customer.model';
import { Car } from '../../models/car.model';
import { CustomerComboBoxComponent } from '../../components/customer-combo-box/customer-combo-box.component';
import { CarRentalTableComponent } from '../../components/car-rental-table/car-rental-table.component';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'rental-create-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomerComboBoxComponent,
    CarRentalTableComponent,
  ],
  templateUrl: './rental-create.page.html',
  styleUrl: './rental-create.page.scss',
})
export class RentalCreatePage implements OnInit {
  header = ['VIN', 'Brand', 'License plate'];
  car!: Car;
  customers: Customer[] = [];
  formGroup!: FormGroup;
  readonly = false;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['car']) {
      this.car = navigation.extras.state['car'];
    }
  }

  public ngOnInit(): void {
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

    this.customerService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (error) => {
        this.dialogService.openDialog({
          title: 'Error',
          message: error.error.message,
        });
      }
    );
  }

  public onSubmit(event: Event): void {
    event.preventDefault();

    if (this.formGroup.valid) {
      this.rentalService.rentCar(this.car.vin, this.formGroup.value).subscribe(
        () => {
          this.dialogService.openDialog(
            {
              title: 'Success',
              message: 'Car rented successfully!',
            },
            () => {
              this.router.navigate(['/rental']);
            }
          );
        },
        (error) => {
          this.dialogService.openDialog({
            title: 'Error',
            message: JSON.stringify(error),
          });
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public onCustomerSelect(customer: Customer | null): void {
    if (customer) {
      this.formGroup.patchValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        address: {
          street: customer.address.street,
          buildingNumber: customer.address.buildingNumber,
          city: customer.address.city,
          country: customer.address.country,
          postalCode: customer.address.postalCode,
        },
      });
      this.readonly = true;
    } else {
      this.formGroup.reset();
      this.readonly = false;
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
