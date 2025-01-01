import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type!: string;
  @Input() model!: any;
  @Input() label!: string;
  @Input() class!: string;
  @Output() click = new EventEmitter<any>();

  public onClick(): void {
    this.click.emit(this.model);
  }
}
