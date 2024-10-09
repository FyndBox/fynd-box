import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import i18n from '../config/i18n';

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('appLanguage') || 'en',
  ); // Default to 'en'

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const switchLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
