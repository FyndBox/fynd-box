import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowBackIos } from '@mui/icons-material';
import {
  Typography,
  IconButton,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useStorage } from '../../hooks/useStorage';
import { useBox, useUpdateBox } from '../../hooks/useBox';
import SearchField from '../../components/SearchField/SearchField';
import BoxDetails from '../../components/BoxDetails/BoxDetails';
import { BoxContainer, ButtonContainer, PrintQRButton } from './BoxPage.styles';
import AddEntityButton from '../../components/AddEntityButton/AddEntityButton';
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter';

const BoxPage: FC = () => {
  const { t } = useTranslation();
  const { storageId, boxId } = useParams<{
    storageId: string;
    boxId: string;
  }>();
  const navigate = useNavigate();

  // Fetch storage details using storageId
  const {
    data: storage,
    isLoading: isStorageLoading,
    error: storageError,
  } = useStorage(storageId!);

  // Fetch box details using boxId
  const {
    data: box,
    isLoading: isBoxLoading,
    error: boxError,
  } = useBox(storageId!, boxId!);

  // Initialize updateBox hook
  const { mutate: updateBox } = useUpdateBox();

  if (!storageId || !boxId) {
    return <div>Error: Storage ID or Box ID is missing.</div>;
  }

  if (isStorageLoading || isBoxLoading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <CircularProgress />
        <Typography variant="body1">{t('common.loading')}</Typography>
      </div>
    );
  }

  if (storageError || boxError) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <Typography variant="body1" color="error">
          {storageError?.message}
        </Typography>
      </div>
    );
  }

  // Handle toggling the favorite status
  const handleToggleFavorite = () => {
    if (box && storageId) {
      updateBox({
        boxId: box.id,
        storageId,
        boxData: {
          ...box,
          isFavorite: !box.isFavorite,
        },
      });
    }
  };

  const handleAddItem = (type: string) => {
    console.log(
      'Navigate to Add Item Page or open modal for adding item',
      type,
    );
  };

  const handlePrintQRCode = () => {
    console.log('Print QR COde');
  };

  const handleFavoriteClick = () => {
    console.log('Favorite button clicked');
    // Iimplement and Navigate to favorites page
  };

  const handleScanClick = () => {
    console.log('Scan button clicked');
    // Implement and Navigate to scan page
  };

  const handleProfileClick = () => {
    console.log('Profile button clicked');
    // Implement and Navigate to profile
  };

  return (
    <>
      <BoxContainer>
        <IconButton onClick={() => navigate('/dashboard')}>
          <ArrowBackIos />
          <Typography variant="h6">{storage?.name}</Typography>
        </IconButton>
        <Divider />
        <SearchField />

        {/* Use the BoxDetails component */}
        {box && (
          <BoxDetails
            name={box.name}
            description={box.description}
            image={box.image}
            isFavorite={box.isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        <Typography variant="body2" p={3} sx={{ textAlign: 'center' }}>
          {t('box.noItemsFound')}
        </Typography>
        {/* Add Item Button */}
        <AddEntityButton
          entityType="item"
          onAdd={() => handleAddItem('item')}
        />

        {/* QR Code Button */}
        <ButtonContainer>
          <PrintQRButton
            fullWidth
            variant="contained"
            onClick={handlePrintQRCode}
          >
            {t('box.printQRcode')}
          </PrintQRButton>
        </ButtonContainer>
        <DashboardFooter
          onFavoriteClick={handleFavoriteClick}
          onScanClick={handleScanClick}
          onProfileClick={handleProfileClick}
        />
      </BoxContainer>
    </>
  );
};

export default BoxPage;
