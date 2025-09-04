import path from 'path';

import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'ar'], // supported languages
  directory: path.join(process.cwd(), 'src/shared/locales'),
  defaultLocale: 'en',
  queryParameter: 'lang', // you can also use ?lang=ar
  objectNotation: true,
  autoReload: true,
  updateFiles: false,
});

export default i18n;
