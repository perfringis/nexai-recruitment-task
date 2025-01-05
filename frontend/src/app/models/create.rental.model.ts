import { Customer } from './customer.model';

export interface CreateRental {
  vin: string;
  customer: Customer;
}
