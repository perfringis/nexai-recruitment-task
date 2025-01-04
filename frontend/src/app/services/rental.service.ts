import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Rental } from '../models/rental.model';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private HOST = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public rentCar(vin: string, customer: Customer) {
    const rental: Rental = {
      vin,
      customer,
    };

    return this.http.post(`${this.HOST}/rental`, rental);
  }

  public returnCar(vin: string) {
    return this.http.put(`${this.HOST}/rental/${vin}/return`, {});
  }
}
