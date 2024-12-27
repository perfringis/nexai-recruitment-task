import { FirstName } from './first.name';

export class Customer {
  private readonly firstName: FirstName;
  private readonly lastName: LastName;
  private readonly address: Address;

  constructor(firstName: FirstName, lastName: LastName, address: Address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
  }
}
