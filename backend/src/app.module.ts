import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './controller/car.controller';
import { CarService } from './service/car.service';
import { CarRepository } from './repository/car.repository';
import { Car } from './entity/car';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './service/customer.service';
import { CustomerRepository } from './repository/customer.repository';
import { Address } from './value-object/address';
import { Customer } from './entity/customer';
import { AddressRepository } from './repository/address.repository';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';
import { RentalRepository } from './repository/rental.repository';
import { Rental } from './entity/rental';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT, 10)
        : 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [Address, Car, Customer, Rental],
    }),
  ],
  controllers: [CarController, CustomerController, RentalController],
  providers: [
    // services
    CarService,
    CustomerService,
    RentalService,

    // repositories
    AddressRepository,
    CarRepository,
    CustomerRepository,
    RentalRepository,
  ],
})
export class AppModule {}
