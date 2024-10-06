import { FC } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSelector: FC = () => {
  const { language, switchLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    switchLanguage(newLanguage);
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="sv">Swedish</option>
      {/* Add other languages here */}
    </select>
  );
};

export default LanguageSelector;
