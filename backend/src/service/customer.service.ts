import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDTO } from 'src/dto/create.customer.dto';
import { UpdateCustomerDTO } from 'src/dto/update.customer.dto';
import { Customer } from 'src/entity/customer';
import { Rental } from 'src/entity/rental';
import { AddressRepository } from 'src/repository/address.repository';
import { CustomerRepository } from 'src/repository/customer.repository';
import { RentalRepository } from 'src/repository/rental.repository';
import { Address } from 'src/value-object/address';
import { BuildingNumber } from 'src/value-object/building.number';
import { City } from 'src/value-object/city';
import { Country } from 'src/value-object/country';
import { Email } from 'src/value-object/email';
import { FirstName } from 'src/value-object/first.name';
import { LastName } from 'src/value-object/last.name';
import { PostalCode } from 'src/value-object/postal.code';
import { Street } from 'src/value-object/street';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly addressRepository: AddressRepository,
    private readonly rentalRepository: RentalRepository,
  ) {}

  public async getCustomers(): Promise<Customer[]> {
    return await this.customerRepository.findAll();
  }

  public async getCustomer(id: string): Promise<Customer> {
    const customer: Customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer does not exists, id = ' + id);
    }

    return customer;
  }

  public async createCustomer(dto: CreateCustomerDTO): Promise<Customer> {
    const existing: Customer = await this.customerRepository.getOne(
      dto.firstName,
      dto.lastName,
      dto.email,
    );

    if (existing) {
      throw new ConflictException('Customer is defined.');
    }

    const address: Address = await this.addressRepository.save(
      new Address(
        new Street(dto.address.street),
        new City(dto.address.city),
        new Country(dto.address.country),
        new PostalCode(dto.address.postalCode),
        new BuildingNumber(dto.address.buildingNumber),
      ),
    );

    const customer: Customer = new Customer(
      new FirstName(dto.firstName),
      new LastName(dto.lastName),
      new Email(dto.email),
      address,
    );

    return await this.customerRepository.save(customer);
  }

  public async updateCustomer(
    id: string,
    dto: UpdateCustomerDTO,
  ): Promise<Customer> {
    const customer: Customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer does not exists, id = ' + id);
    }

    const address: Address = customer.getAddress();
    address.setStreet(new Street(dto.address.street));
    address.setCity(new City(dto.address.city));
    address.setCountry(new Country(dto.address.country));
    address.setPostalCode(new PostalCode(dto.address.postalCode));
    address.setBuildingNumber(new BuildingNumber(dto.address.buildingNumber));

    await this.addressRepository.save(address);

    customer.setFirstName(new FirstName(dto.firstName));
    customer.setLastName(new LastName(dto.lastName));
    customer.setEmail(new Email(dto.email));
    customer.setAddress(address);

    return await this.customerRepository.save(customer);
  }

  public async deleteCustomer(id: string): Promise<void> {
    const rental: Rental = await this.rentalRepository.findByCustomerId(id);
    if (rental) {
      throw new ConflictException(
        'Customer cannot be deleted, because he has active rentals.',
      );
    }

    const customer: Customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer does not exists, id = ' + id);
    }

    await this.customerRepository.remove(customer);
    await this.addressRepository.remove(customer.getAddress());
  }
}
