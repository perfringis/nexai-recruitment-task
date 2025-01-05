import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDTO } from 'src/dto/create.rental.dto';
import { Car } from 'src/entity/car';
import { Customer } from 'src/entity/customer';
import { Rental } from 'src/entity/rental';
import { AddressRepository } from 'src/repository/address.repository';
import { CarRepository } from 'src/repository/car.repository';
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
export class RentalService {
  constructor(
    private readonly rentalRepository: RentalRepository,
    private readonly carRepository: CarRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  public async getActiveRentals(): Promise<Rental[]> {
    return await this.rentalRepository.findActiveRentals();
  }

  public async rent(dto: CreateRentalDTO): Promise<Rental> {
    const car: Car = await this.carRepository.findByVIN(dto.vin);
    if (!car) {
      throw new NotFoundException('Car does not exists, vin = ' + dto.vin);
    }

    let customer: Customer = await this.customerRepository.getOne(
      dto.customer.firstName,
      dto.customer.lastName,
      dto.customer.email,
    );

    if (!customer) {
      const address: Address = await this.addressRepository.save(
        new Address(
          new Street(dto.customer.address.street),
          new City(dto.customer.address.city),
          new Country(dto.customer.address.country),
          new PostalCode(dto.customer.address.postalCode),
          new BuildingNumber(dto.customer.address.buildingNumber),
        ),
      );

      customer = await this.customerRepository.save(
        new Customer(
          new FirstName(dto.customer.firstName),
          new LastName(dto.customer.lastName),
          new Email(dto.customer.email),
          address,
        ),
      );
    }

    const rental: Rental = car.rentBy(customer);
    await this.carRepository.save(car);

    return await this.rentalRepository.save(rental);
  }

  public async return(vin: string): Promise<void> {
    const car: Car = await this.carRepository.findByVIN(vin);
    if (!car) {
      throw new NotFoundException('Car does not exists, vin = ' + vin);
    }

    car.return();
    await this.carRepository.save(car);

    const rental: Rental = await this.rentalRepository.findByCarId(car.getId());
    rental.finish();
    await this.rentalRepository.save(rental);
  }
}
