import { Injectable } from '@nestjs/common';
import { Address } from 'src/value-object/address';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AddressRepository extends Repository<Address> {
  constructor(private dataSource: DataSource) {
    super(Address, dataSource.createEntityManager());
  }
}
