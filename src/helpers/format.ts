import { format, parse } from 'date-fns';

function date(
  date: string,
  fromFormat: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss',
  toFormat: 'dd/MM/yyyy' | 'dd/MM/yyyy HH:mm'
) {
  return format(parse(date, fromFormat, new Date()), toFormat);
}

function currency(val: number, locale: 'en-SG' | 'en-US', currency: 'SGD' | 'USD') {
  const instance = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0
  });
  return instance.format(val);
}

export default { date, currency };
