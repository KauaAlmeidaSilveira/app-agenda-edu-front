import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  private datePipe: DatePipe = new DatePipe('en-US');

  transform(value: string, format: string = 'dd/MM/yyyy'): string | null {
    if (!value) return null;
    const date = new Date(value);
    date.setHours(date.getHours() + (date.getTimezoneOffset() / 60));
    return this.datePipe.transform(date, format);
  }
}
