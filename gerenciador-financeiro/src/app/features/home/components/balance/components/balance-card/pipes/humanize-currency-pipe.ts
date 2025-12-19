import { formatCurrency } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

const suffixes = ['K', 'M', 'B', 'T', ['?']];


@Pipe({
  name: 'humanizeCurrency'
})
export class HumanizeCurrencyPipe implements PipeTransform {
  private readonly _currencyCode = inject(DEFAULT_CURRENCY_CODE);
  private readonly _localeId = inject(LOCALE_ID);

  transform(value: number): unknown {
    var formatedValue = formatCurrency(value, this._localeId, this.getCurrencySymbol());
    const splittedValue = formatedValue.split('.');

    if(splittedValue.length === 1) return splittedValue[0];
    
    return this.formatValueWithSuffix(splittedValue);
  }

  private formatValueWithSuffix(splittedValue: string[]) {
     const suffix = this.getSuffixes(splittedValue)

    const [firstValue, secondValue] = splittedValue;

    const firstValueOfSecondValue = secondValue.charAt(0);

    if(firstValueOfSecondValue === '0') {
      return `${firstValue}${suffix}`;
    } else {
      return `${firstValue}${firstValueOfSecondValue}${suffix}`;
    }
  }
  private getSuffixes(splittedValue: string[]) {
    return suffixes[splittedValue.length - 2];
  }

  private getCurrencySymbol() {
    const {value} = Intl.NumberFormat(this._localeId, { style: 'currency', currency: this._currencyCode })
      .formatToParts()
      .find(part => part.type === 'currency')!;

    return value;
  }
}
