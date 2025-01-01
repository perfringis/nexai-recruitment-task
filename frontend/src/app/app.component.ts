import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LinkModel } from './models/link.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Car rental';
  menu: LinkModel[] = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Customer',
      href: '/customer',
    },
    {
      name: 'Car',
      href: '/car',
    },
    {
      name: 'Rental',
      href: '/rental',
    },
  ];
}
