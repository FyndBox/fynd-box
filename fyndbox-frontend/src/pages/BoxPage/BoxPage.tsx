import { FC, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowBackIos } from '@mui/icons-material';
import {
  Typography,
  IconButton,
  CircularProgress,
  Divider,
  Box,
} from '@mui/material';
import { useStorage } from '../../hooks/useStorage';
import { useBox, useUpdateBox } from '../../hooks/useBox';
import SearchField from '../../components/SearchField/SearchField';
import BoxDetails from '../../components/BoxDetails/BoxDetails';
import { BoxContainer, ButtonContainer, PrintQRButton } from './BoxPage.styles';
import AddEntityButton from '../../components/AddEntityButton/AddEntityButton';
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter';
import {
  useCreateItem,
  useDeleteItem,
  useItems,
  useUpdateItem,
} from '../../hooks/useItem';
import EntityCard from '../../components/EntityCard/EntityCard';
import { EntityType } from '../../types/entityTypes';
import EntityActionModal from '../../components/modal/EntityActionModal';

const BoxPage: FC = () => {
  const { t } = useTranslation();
  const { storageId, boxId } = useParams<{
    storageId: string;
    boxId: string;
  }>();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [entityType, setEntityType] = useState<EntityType>('item');
  const [editingData, setEditingData] = useState<any | null>(null);

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

  // Fetch all items for the box
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useItems(boxId!);

  // Initialize hooks for creating, updating, and deleting items
  const { mutate: createItem } = useCreateItem();
  const { mutate: updateItem } = useUpdateItem();
  const { mutate: deleteItem } = useDeleteItem();

  if (!storageId || !boxId) {
    return <div>Error: Storage ID or Box ID is missing.</div>;
  }

  if (isStorageLoading || isBoxLoading || isItemsLoading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <CircularProgress />
        <Typography variant="body1">{t('common.loading')}</Typography>
      </div>
    );
  }

  if (storageError || boxError || itemsError) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <Typography variant="body1" color="error">
          {storageError?.message || boxError?.message || itemsError?.message}
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

  // Open modal for adding or editing an entity
  const handleAddEntity = (type: EntityType) => {
    setEntityType(type);
    setModalMode('add');
    setEditingData(null);
    setModalOpen(true);
  };

  const handleEditEntity = (
    type: EntityType,
    data: { id: string; name: string; description?: string; image?: string },
  ) => {
    setEntityType(type);
    setModalMode('edit');
    setEditingData(data);
    setModalOpen(true);
  };

  // Handle saving a new or edited item
  const handleSave = (data: {
    name: string;
    description?: string;
    image?: string;
  }) => {
    if (modalMode === 'add') {
      createItem({
        storageId: storageId!,
        boxId: boxId!,
        itemData: data,
      });
    } else if (modalMode === 'edit' && editingData?.id) {
      updateItem({
        itemId: editingData.id,
        boxId: boxId!,
        storageId: storageId!,
        itemData: data,
      });
    }
    setModalOpen(false);
  };

  // Handle deleting an item
  const handleDelete = () => {
    if (entityType === 'item' && editingData?.id) {
      deleteItem({
        itemId: editingData.id,
        boxId: boxId!,
        storageId: storageId!,
      });
    }
    setModalOpen(false);
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

        {/* BoxDetails component */}
        {box && (
          <BoxDetails
            name={box.name}
            description={box.description}
            image={box.image}
            isFavorite={box.isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {items && items.length === 0 ? (
          <Typography variant="body2" p={3} sx={{ textAlign: 'center' }}>
            {t('box.noItemsFound')}
          </Typography>
        ) : (
          items?.map((item, index) => (
            <Box key={index}>
              <EntityCard
                name={item.name}
                description={item.description ?? ''}
                image={item.image ?? ''}
                entityType="item"
                onEdit={() => handleEditEntity('item', item)}
              />
            </Box>
          ))
        )}
        {/* Add Item Button */}
        <AddEntityButton
          entityType="item"
          onAdd={() => handleAddEntity('item')}
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
      <EntityActionModal
        key={modalMode}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        entityType={entityType}
        mode={modalMode}
        initialData={editingData || undefined}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default BoxPage;
