import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() type: string = 'text';
  @Input() autocomplete!: string;
  @Input() label!: string;
  @Input() model!: string;

  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  onModelChange(value: string): void {
    this.model = value;
    this.modelChange.emit(this.model);
  }
}
