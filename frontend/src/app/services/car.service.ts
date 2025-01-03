import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private HOST = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.HOST}/cars`);
  }

  public editCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.HOST}/car/${car.vin}`, car);
  }

  public createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.HOST}/car`, car);
  }

  public deleteCar(carId: string) {
    return this.http.delete(`${this.HOST}/car/${carId}`);
  }
}
