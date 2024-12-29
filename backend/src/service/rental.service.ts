import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDTO } from 'src/dto/create.rental.dto';
import { Car } from 'src/entity/car';
import { Customer } from 'src/entity/customer';
import { Rental } from 'src/entity/rental';
import { CarRepository } from 'src/repository/car.repository';
import { CustomerRepository } from 'src/repository/customer.repository';
import { RentalRepository } from 'src/repository/rental.repository';

@Injectable()
export class RentalService {
  constructor(
    private readonly rentalRepository: RentalRepository,
    private readonly carRepository: CarRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  public async rent(dto: CreateRentalDTO): Promise<Rental> {
    const car: Car = await this.carRepository.findByVIN(dto.vin);

    if (!car) {
      throw new NotFoundException('Car does not exists, vin = ' + dto.vin);
    }

    const customer: Customer = await this.customerRepository.findById(
      dto.customerId,
    );

    if (!customer) {
      throw new NotFoundException(
        'Customer does not exists, id = ' + dto.customerId,
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
