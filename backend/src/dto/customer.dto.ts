import { Customer } from 'src/entity/customer';
import { AddressDTO } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  address: AddressDTO;

  constructor(customer: Customer) {
    this.firstName = customer.getFirstName().toString();
    this.lastName = customer.getLastName().toString();
    this.address = new AddressDTO(customer.getAddress());
  }
}
