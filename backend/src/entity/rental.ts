import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer';
import { Car } from './car';

@Entity({ name: 'rental' })
export class Rental extends BaseEntity {
  @ManyToOne(() => Customer, (customer) => customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Car, (car) => car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({
    name: 'start_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  private startAt: Date;

  constructor(customer: Customer, car: Car) {
    super();

    this.customer = customer;
    this.car = car;
  }
}
