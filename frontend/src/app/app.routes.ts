import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'customer',
    loadComponent: () =>
      import('./pages/customer/customer.component').then((m) => m.CustomerComponent),
  },
  {
    path: 'customer/edit/:id',
    loadComponent: () =>
      import('./pages/customer-edit/customer-edit.component').then((m) => m.CustomerEditComponent),
  },
  {
    path: 'car',
    loadComponent: () =>
      import('./pages/car/car.component').then((m) => m.CarComponent),
  },
  {
    path: 'rental',
    loadComponent: () =>
      import('./pages/rental/rental.component').then((m) => m.RentalComponent),
  },
];
