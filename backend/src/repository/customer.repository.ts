import { Injectable } from '@nestjs/common';
import { Customer } from 'src/entity/customer';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  public async findAll(): Promise<Customer[]> {
    return this.find({});
  }

  public async findById(id: string): Promise<Customer> {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }

  public async getOne(
    firstName: string,
    lastName: string,
    email: string,
  ): Promise<Customer> {
    return await this.findOne({
      where: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    });
  }
}
