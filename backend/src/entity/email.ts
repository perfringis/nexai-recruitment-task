import { InvalidEmailException } from 'src/error/invalid.email.exception';

export class Email {
  private readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public static of(email: string): Email {
    if (!this.valid(email)) {
      throw new InvalidEmailException('Invalid email address!');
    }

    return new Email(email);
  }

  private static valid(email: string) {
    const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  public asString(): string {
    return this.email;
  }

  public equals(other: Email): boolean {
    return this.email === other.asString();
  }
}
