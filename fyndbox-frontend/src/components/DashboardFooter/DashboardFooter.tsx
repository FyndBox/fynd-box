import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FooterActionButton, FooterContainer } from './DashboardFooter.styles';

interface DashboardFooterProps {
  onFavoriteClick: () => void;
  onScanClick: () => void;
  onProfileClick: () => void;
}

const DashboardFooter: FC<DashboardFooterProps> = ({
  onFavoriteClick,
  onScanClick,
  onProfileClick,
}) => {
  const { t } = useTranslation();
  return (
    <FooterContainer showLabels>
      <FooterActionButton
        label={t('dashboard.footer.favorite')}
        icon={<FavoriteIcon />}
        onClick={onFavoriteClick}
      />
      <FooterActionButton
        label={t('dashboard.footer.scan')}
        icon={<QrCodeScannerIcon />}
        onClick={onScanClick}
      />
      <FooterActionButton
        label={t('dashboard.footer.profile')}
        icon={<AccountCircleIcon />}
        onClick={onProfileClick}
      />
    </FooterContainer>
  );
};

export default DashboardFooter;
