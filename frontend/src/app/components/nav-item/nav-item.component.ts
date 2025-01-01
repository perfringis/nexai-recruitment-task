import { Component, Input } from '@angular/core';
import { LinkModel } from '../../models/link.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
})
export class NavItemComponent {
  @Input() item!: LinkModel;

  constructor(private router: Router) {}

  public isActive(): boolean {
    return this.router.url === this.item.href;
  }
}
