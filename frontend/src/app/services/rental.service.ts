import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private HOST = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public rentCar() {}

  public returnCar(vin: string) {
    return this.http.put(`${this.HOST}/rental/${vin}/return`, {});
  }
}
