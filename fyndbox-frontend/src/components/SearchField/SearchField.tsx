import { FC, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

import { SearchFieldContainer, SearchTextField } from './SearchField.styles';

const SearchField: FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <SearchFieldContainer>
      <SearchTextField
        variant="outlined"
        placeholder={t('dashboard.search.placeholder')}
        value={searchQuery}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </SearchFieldContainer>
  );
};

export default SearchField;
