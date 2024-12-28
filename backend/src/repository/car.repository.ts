import { Injectable } from '@nestjs/common';
import { Car } from 'src/entity/car';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CarRepository extends Repository<Car> {
  constructor(private dataSource: DataSource) {
    super(Car, dataSource.createEntityManager());
  }

  public async findAll(): Promise<Car[]> {
    return await this.find({});
  }

  public async findByVIN(vin: string): Promise<Car> {
    return await this.findOne({
      where: {
        vin: vin,
      },
    });
  }

  public async deleteByVIN(vin: string): Promise<void> {
    await this.delete({ vin: vin });
  }
}
