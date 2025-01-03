import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'customer',
    loadComponent: () =>
      import('./pages/customer/customer.page').then((m) => m.CustomerPage),
  },
  {
    path: 'customer/new',
    loadComponent: () =>
      import('./pages/customer-create/customer-create.page').then(
        (m) => m.CustomerCreatePage
      ),
  },
  {
    path: 'customer/edit/:id',
    loadComponent: () =>
      import('./pages/customer-edit/customer-edit.page').then(
        (m) => m.CustomerEditPage
      ),
  },
  {
    path: 'car',
    loadComponent: () => import('./pages/car/car.page').then((m) => m.CarPage),
  },
  {
    path: 'car/new',
    loadComponent: () =>
      import('./pages/car-create/car-create.page').then((m) => m.CarCreatePage),
  },
  {
    path: 'rental',
    loadComponent: () =>
      import('./pages/rental/rental.page').then((m) => m.RentalPage),
  },
];
