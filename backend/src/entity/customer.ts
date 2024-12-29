import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Address } from 'src/value-object/address';
import { LastName, LastNameTransformer } from 'src/value-object/last.name';
import { FirstName, FirstNameTransformer } from 'src/value-object/first.name';
import { Email, EmailTransformer } from 'src/value-object/email';
import { BaseEntity } from './base.entity';

@Entity({ name: 'customer' })
export class Customer extends BaseEntity {
  @Column({
    name: 'first_name',
    type: 'varchar',
    transformer: FirstNameTransformer,
  })
  public firstName: FirstName;

  @Column({
    name: 'last_name',
    type: 'varchar',
    transformer: LastNameTransformer,
  })
  public lastName: LastName;

  @Column({
    name: 'email',
    type: 'varchar',
    transformer: EmailTransformer,
  })
  public email: Email;

  @OneToOne(() => Address, (address) => address, { eager: true })
  @JoinColumn({ name: 'address_id' })
  public address: Address;

  constructor(
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    address: Address,
  ) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
  }

  public getFirstName(): FirstName {
    return this.firstName;
  }

  public setFirstName(firstName: FirstName): void {
    this.firstName = firstName;
  }

  public getLastName(): LastName {
    return this.lastName;
  }

  public setLastName(lastName: LastName): void {
    this.lastName = lastName;
  }

  public getEmail(): Email {
    return this.email;
  }

  public setEmail(email: Email): void {
    this.email = email;
  }

  public getAddress(): Address {
    return this.address;
  }

  public setAddress(address: Address): void {
    this.address = address;
  }
}
