import { Customer } from "./customer.model";

export interface Rental {
  vin: string;
  customer: Customer;
}
