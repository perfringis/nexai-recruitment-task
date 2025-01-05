import { Car } from './car.model';
import { Customer } from './customer.model';

export interface Rental {
  startAt: Date;
  endAt: Date;
  car: Car;
  customer: Customer;
}
