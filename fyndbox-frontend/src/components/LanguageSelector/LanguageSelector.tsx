import { FC } from 'react';
import { MenuItem, Box } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import swedishFlag from '../../assets/flags/sweden.png';
import ukFlag from '../../assets/flags/uk.png';
import { FlagIcon, LanguageSelect } from './LanguageSelector.styles';

const LanguageSelector: FC = () => {
  const { language, switchLanguage } = useLanguage();

  const handleLanguageChange = (e: any) => {
    const newLanguage = e.target.value;
    switchLanguage(newLanguage);
  };

  return (
    <Box>
      <LanguageSelect
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        size="small"
        variant="outlined"
      >
        <MenuItem value="en">
          <FlagIcon src={ukFlag} alt="English" />
          English
        </MenuItem>
        <MenuItem value="sv">
          <FlagIcon src={swedishFlag} alt="Swedish" />
          Swedish
        </MenuItem>
      </LanguageSelect>
    </Box>
  );
};

export default LanguageSelector;
