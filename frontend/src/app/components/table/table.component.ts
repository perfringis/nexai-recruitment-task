import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-table',
  imports: [ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() header!: string[];
  @Input() customers!: Customer[];

  constructor(private router: Router) {}

  public editCustomer(customer: Customer): void {
    this.router.navigate([`/customer/edit/${customer.id}`], {
      state: { customer },
    });
  }

  public deleteCustomer(customer: Customer): void {}
}
