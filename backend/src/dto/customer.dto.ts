import { Customer } from 'src/entity/customer';
import { AddressDTO } from './address.dto';

export class CustomerDTO {
  firstName: string;
  lastName: string;
  address: AddressDTO;

  constructor(customer: Customer) {
    this.firstName = customer.getFirstName().toString();
    this.lastName = customer.getLastName().toString();
    this.address = new AddressDTO(customer.getAddress());
  }
}
