import { Customer } from 'src/entity/customer';
import { AddressDTO } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: AddressDTO;

  constructor(customer: Customer) {
    this.id = customer.getId();
    this.firstName = customer.getFirstName().toString();
    this.lastName = customer.getLastName().toString();
    this.email = customer.getEmail().toString();
    this.address = new AddressDTO(customer.getAddress());
  }
}
