import { FC } from 'react';
import { IconButton } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { AppBarContainer, ToolbarContainer } from './TopBar.styles';
import PageHeader from '../PageHeader/PageHeader';

const TopBar: FC = () => {
  const { t } = useTranslation();
  return (
    <AppBarContainer position="static">
      <ToolbarContainer>
        <PageHeader heading={t('dashboard.title')} />
        <IconButton edge="end" color="secondary">
          <Notifications sx={{ fontSize: 30 }} />
        </IconButton>
      </ToolbarContainer>
    </AppBarContainer>
  );
};

export default TopBar;
