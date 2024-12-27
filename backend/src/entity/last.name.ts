import { InvalidLastNameException } from 'src/error/invalid.last.name.exception';

export class LastName {
  private readonly lastName: string;

  constructor(lastName: string) {
    if (!this.valid(lastName)) {
      throw new InvalidLastNameException(
        'Provided value cannot be empty or have digits.',
      );
    }

    this.lastName = lastName;
  }

  public valid(lastName: string): boolean {
    const regex = /^[A-Za-z]+$/;

    return regex.test(lastName);
  }

  public asString(): string {
    return this.lastName;
  }

  public equals(other: LastName): boolean {
    return this.lastName === other.asString();
  }
}
