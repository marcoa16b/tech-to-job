import * as rootParams from 'next/root-params';
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {notFound} from 'next/navigation';

export default getRequestConfig(async () => {
  const paramValue = await rootParams.locale();

  let locale;
  if (hasLocale(routing.locales, paramValue)) {
    locale = paramValue;
  } else {
    // Runtime validation for unknown locales
    notFound();
  }


  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
