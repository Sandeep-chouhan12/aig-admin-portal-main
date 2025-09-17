import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: any): string {
    if (value === null || isNaN(value)) {
      return '';
    }

    const numberString = value.toString();

    // Check if the value is greater than or equal to 10000
    if (value >= 10000) {
      const firstPart = numberString.slice(0, numberString.length - 3);
      const secondPart = numberString.slice(numberString.length - 3);

      // Use regular expression to add commas after every two digits in the first part
      const formattedNumber = firstPart.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + secondPart;

      return formattedNumber;
    } else {
      // Use regular expression to add commas after every three digits
      const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formattedNumber;
    }
  }
}
