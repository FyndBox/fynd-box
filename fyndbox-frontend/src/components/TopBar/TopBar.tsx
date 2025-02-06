import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBarContainer, ToolbarContainer } from './TopBar.styles';
import PageHeader from '../PageHeader/PageHeader';
import CustomNotifications from '../Notifications/CustomNotifications';

const TopBar: FC = () => {
  const { t } = useTranslation();
  return (
    <AppBarContainer position="static">
      <ToolbarContainer>
        <PageHeader heading={t('dashboard.title')} />
        <CustomNotifications />
      </ToolbarContainer>
    </AppBarContainer>
  );
};

export default TopBar;
