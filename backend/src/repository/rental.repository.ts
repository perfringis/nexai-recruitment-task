import { Injectable } from '@nestjs/common';
import { Rental } from 'src/entity/rental';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RentalRepository extends Repository<Rental> {
  constructor(private dataSource: DataSource) {
    super(Rental, dataSource.createEntityManager());
  }

  public async findByCarId(carId: string): Promise<Rental> {
    return await this.findOne({
      where: {
        car: {
          id: carId,
        },
      },
    });
  }

  public async findByCustomerId(customerId: string): Promise<Rental> {
    return await this.findOne({
      where: {
        customer: {
          id: customerId,
        },
      },
    });
  }
}
