import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer';
import { Car } from './car';

@Entity({ name: 'rental' })
export class Rental extends BaseEntity {
  @ManyToOne(() => Customer, (customer) => customer, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Car, (car) => car, { eager: true })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({
    name: 'start_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  private startAt: Date;

  @Column({ name: 'end_at', type: 'timestamp', nullable: true })
  private endAt: Date;

  constructor(customer: Customer, car: Car) {
    super();

    this.customer = customer;
    this.car = car;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getCar(): Car {
    return this.car;
  }

  public getStartAt(): Date {
    return this.startAt;
  }

  public getEndAt(): Date {
    return this.endAt;
  }

  public finish(): void {
    const now = new Date();
    this.endAt = now;
  }
}
