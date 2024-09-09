import { Component, EventEmitter, Input, Output } from '@angular/core';

type InputTypes = 'text' | 'password' | 'email';

@Component({
  selector: 'app-primary-input',
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent {

  @Input({required:true}) type: InputTypes = 'text';
  @Input({required:true}) placeholder: string = '';
  @Input() autocomplete: string = '';
  @Input({required:true}) name: string = '';

  value: string = ''

  onInput(event: Event){
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value)
  }

  @Output('value') valueEmit = new EventEmitter<string>();

  onChange(value: string){
    this.valueEmit.emit(value)
  }


}
