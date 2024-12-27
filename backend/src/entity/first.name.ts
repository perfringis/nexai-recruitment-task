import { InvalidFirstNameException } from 'src/error/invalid.first.name.exception';

export class FirstName {
  private readonly firstName: string;

  constructor(firstName: string) {
    if (!this.valid(firstName)) {
      throw new InvalidFirstNameException(
        'Provided value cannot be empty or have digits.',
      );
    }

    this.firstName = firstName;
  }

  public valid(firstName: string): boolean {
    const regex = /^[A-Za-z]+$/;

    return regex.test(firstName);
  }

  public asString(): string {
    return this.firstName;
  }

  public equals(other: FirstName): boolean {
    return this.firstName === other.asString();
  }
}
