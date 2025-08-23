import { Request, Response, NextFunction } from 'express';

import i18n from '../config/i18n';

export function localeMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Priority order: query parameter > header > default
  const queryLang = req.query.lang as string;
  const headerLang = req.headers['accept-language'];
  const defaultLocale = 'en';

  let locale = defaultLocale;

  // Check query parameter first
  if (queryLang && i18n.getLocales().includes(queryLang)) {
    locale = queryLang;
  }
  // Check Accept-Language header
  else if (headerLang && headerLang.split(',')[0]) {
    const preferredLang = headerLang.split(',')[0]!.split('-')[0];
    if (preferredLang && i18n.getLocales().includes(preferredLang)) {
      locale = preferredLang;
    }
  }

  // Set locale on request object
  req.locale = locale;

  // Safely set locale for i18n
  req.setLocale(locale);

  next();
}
