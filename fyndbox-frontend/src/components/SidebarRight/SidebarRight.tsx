import { FC, useMemo, useState } from 'react';
import { Box, Divider, Drawer, IconButton } from '@mui/material';
import { KeyboardArrowRightRounded } from '@mui/icons-material';
import { useStorages } from '../../hooks/useStorage';
import EntityCard from '../EntityCard/EntityCard';
import { CustomIcon } from '../../styles/commonStyles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EntityType } from '../../types/entityTypes';
import EntityActionModal from '../Modal/EntityActionModal';
import { useDeleteBox, useUpdateBox } from '../../hooks/useBox';

const SidebarRight: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expandedStorageIndex, setExpandedStorageIndex] = useState<
    number | null
  >(null);
  const { data: storages } = useStorages();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [entityType, setEntityType] = useState<EntityType>('storage');
  const [editingData, setEditingData] = useState<any | null>(null);
  const { mutate: updateBox } = useUpdateBox();
  const { mutate: deleteBox } = useDeleteBox();


  const handleBoxOpen = (storageId: string, boxId: string) => {
    navigate(`/box/${storageId}/${boxId}`);
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

  const handleSave = (data: {
    name: string;
    description?: string;
    image?: string;
  }) => {
    if (modalMode === 'edit' && editingData?.id) {
      if (entityType === 'box' && expandedStorageIndex !== null) {
        const storageId = storages?.[expandedStorageIndex].id;
        if (storageId) {
          updateBox({ boxId: editingData.id, storageId, boxData: data });
        }
      }
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (entityType === 'box' && expandedStorageIndex !== null) {
      const storageId = storages?.[expandedStorageIndex].id;
      if (storageId) {
        deleteBox({ boxId: editingData.id, storageId });
      }
    }
    setModalOpen(false);
  };


  const favoriteBoxes = useMemo(() => {
    return storages
      ?.flatMap((storage) => storage.boxes)
      ?.filter((box) => box.isFavorite);
  }, [storages]);

  console.log('Favorite Boxes:', favoriteBoxes);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box display="flex" alignItems="center" p={2}>
        <h1>Favorite Boxes</h1>
      </Box>
      <Divider orientation="horizontal" />
      {favoriteBoxes && favoriteBoxes.length > 0 ? (
        favoriteBoxes.map((box, boxIndex) => (
          <EntityCard
            key={boxIndex}
            name={box.name}
            description={box.description}
            iconButton={
              <IconButton
                onClick={() => handleBoxOpen(storages![0].id, box.id)}
              >
                <CustomIcon>
                  <KeyboardArrowRightRounded />
                </CustomIcon>
              </IconButton>
            }
            image={box.image ?? ''}
            entityType="box"
            onEdit={() => handleEditEntity('box', box)}
          />
        ))
      ) : (
        <p>No favorites yet!</p>
      )}
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
    </Drawer>
  );
};

export default SidebarRight;
