import { Request, Response, NextFunction } from 'express';

import i18n from '../lib/i18n';

export function localeMiddleware(req: Request, _: Response, next: NextFunction): void {
  const queryLang = req.query.lang as string;
  const headerLang = req.headers['accept-language'];
  const defaultLocale = 'en';

  let locale = defaultLocale;

  if (queryLang && i18n.getLocales().includes(queryLang)) {
    locale = queryLang;
  } else if (headerLang && headerLang.split(',')[0]) {
    const preferredLang = headerLang.split(',')[0]!.split('-')[0];
    if (preferredLang && i18n.getLocales().includes(preferredLang)) {
      locale = preferredLang;
    }
  }

  req.locale = locale;

  req.setLocale(locale);

  next();
}
