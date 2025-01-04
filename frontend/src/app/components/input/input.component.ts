import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() type: string = 'text';
  @Input() autocomplete!: string;
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() readonly!: boolean;

  @Input() model!: string;

  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  onModelChange(value: string): void {
    this.model = value;
    this.modelChange.emit(this.model);
  }
}
