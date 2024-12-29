import { Injectable } from '@nestjs/common';
import { Car } from 'src/entity/car';
import { Rental } from 'src/entity/rental';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RentalRepository extends Repository<Rental> {
  constructor(private dataSource: DataSource) {
    super(Rental, dataSource.createEntityManager());
  }

  public async findByCar(car: Car): Promise<Rental> {
    return await this.findOne({
      where: {
        car: car,
      },
    });
  }
}
