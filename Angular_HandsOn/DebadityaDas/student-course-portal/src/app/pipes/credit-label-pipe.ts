import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabelPipe',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  // Step 35: Implementation method rules transforming data representations shapes layers bounds mapping lines parameters
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    if (value === 1) {
      return '1 Credit';
    }
    return `${value} Credits`;
  }
}
