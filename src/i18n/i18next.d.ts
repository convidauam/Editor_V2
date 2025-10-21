import 'i18next';
import es from './locales/es.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof es;
    };
  }
}
