import { Address } from './address';
import { FirstName } from './first.name';
import { LastName } from './last.name';

export class Customer {
  private firstName: FirstName;
  private lastName: LastName;
  private address: Address;

  constructor(firstName: FirstName, lastName: LastName, address: Address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
  }
}
