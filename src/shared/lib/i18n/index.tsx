import React, { createContext, useContext, useMemo, useState } from 'react';
import de from '../../../locales/de.json';

type Locale = 'de';

type Messages = Record<string, string>;

interface I18nContextValue {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const messagesByLocale: Record<Locale, Messages> = {
  de,
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('de');

  const value = useMemo(() => {
    const messages = messagesByLocale[locale] ?? messagesByLocale.de;

    const translate = (key: string): string => {
      const message = messages[key];
      if (typeof message === 'string') {
        return message;
      }
      return key;
    };

    return {
      locale,
      t: translate,
      setLocale,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};
