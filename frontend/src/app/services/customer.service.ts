import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private HOST = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.HOST}/customers`);
  }

  public editCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.HOST}/customer/${customer.id}`,
      customer
    );
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.HOST}/customer`, customer);
  }

  public deleteCustomer(customerId: string) {
    return this.http.delete(`${this.HOST}/customer/${customerId}`);
  }
}
