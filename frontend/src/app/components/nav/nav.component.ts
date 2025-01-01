import { Component, Input } from '@angular/core';
import { LinkModel } from '../../models/link.model';
import { NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  selector: 'app-nav',
  imports: [NavItemComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @Input() menu!: LinkModel[];
}
