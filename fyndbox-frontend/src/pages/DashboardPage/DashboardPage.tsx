import { FC, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';
import TopBar from '../../components/TopBar/TopBar';
import SearchField from '../../components/SearchField/SearchField';
import EntityCard from '../../components/EntityCard/EntityCard';
import AddEntityButton from '../../components/AddEntityButton/AddEntityButton';
import DashboardFooter from '../../components/DashboardFooter/DashboardFooter';
import { CustomIcon } from '../../styles/commonStyles';
import {
  DashboardContainer,
  MainContainer,
  SubContainer,
} from './DashboardPage.styles';
import { EntityType } from '../../types/entityTypes';

const DashboardPage: FC = () => {
  const [expandedStorageIndex, setExpandedStorageIndex] = useState<
    number | null
  >(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [entityType, setEntityType] = useState<EntityType>('storage');
  const [editingData, setEditingData] = useState<any | null>(null);

  const storages = [
    {
      name: 'Garage',
      description: 'Mine Garage',
      boxes: [
        {
          name: 'Box1',
          description: 'My Box 1',
        },
        {
          name: 'Box2',
          description: 'My Box 2',
        },
      ],
    },
    {
      name: 'Garage2',
      description: 'Mine Garage2',
      boxes: [
        {
          name: 'Box1',
          description: 'Garage 2 Box 1',
        },
      ],
    },
  ];

  const handleToggleExpand = (index: number) => {
    setExpandedStorageIndex(expandedStorageIndex === index ? null : index);
  };

  const handleBoxOpen = (index: number) => {
    console.log(index, 'Implement Box Page and navigate it');
  };

  // Add Method: Can be used for creating any type of entity
  const handleAddEntity = (type: EntityType) => {
    console.log(`Add the ${type}`);
    setEntityType(type);
    setModalMode('add');
    setEditingData(null); // Reset form fields for adding a new entity
    setModalOpen(true);
  };
  // Edit Method: Can be used for editing any type of entity
  const handleEditEntity = (
    type: EntityType,
    data: { name: string; description: string; image?: string },
  ) => {
    console.log(`Edit the ${type}`);
    setEntityType(type);
    setModalMode('edit');
    setEditingData(data); // Pre-fill form fields with existing entity data
    setModalOpen(true);
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
      <TopBar />
      <DashboardContainer>
        <SearchField />
        <MainContainer>
          {storages.map((storage, index) => (
            <Box key={index}>
              <EntityCard
                name={storage.name}
                description={storage.description}
                iconButton={
                  <IconButton onClick={() => handleToggleExpand(index)}>
                    {expandedStorageIndex === index ? (
                      <CustomIcon>
                        <ExpandLessRounded />
                      </CustomIcon>
                    ) : (
                      <CustomIcon>
                        <ExpandMoreRounded />
                      </CustomIcon>
                    )}
                  </IconButton>
                }
                entityType="storage"
                onEdit={() => handleEditEntity('storage', storage)}
              />
              {expandedStorageIndex === index && (
                <SubContainer>
                  {storage.boxes?.map((box, boxIndex) => (
                    <EntityCard
                      key={boxIndex}
                      name={box.name}
                      description={box.description}
                      iconButton={
                        <IconButton onClick={() => handleBoxOpen(boxIndex)}>
                          <CustomIcon>
                            <KeyboardArrowRightRounded />
                          </CustomIcon>
                        </IconButton>
                      }
                      image=""
                      entityType="box"
                      onEdit={() => handleEditEntity('box', box)}
                    />
                  ))}
                  <AddEntityButton
                    entityType="box"
                    onAdd={() => handleAddEntity('box')}
                  />
                </SubContainer>
              )}
            </Box>
          ))}
          <AddEntityButton
            entityType="storage"
            onAdd={() => handleAddEntity('storage')}
          />
        </MainContainer>
      </DashboardContainer>
      <DashboardFooter
        onFavoriteClick={handleFavoriteClick}
        onScanClick={handleScanClick}
        onProfileClick={handleProfileClick}
      />
      {/* Add your modal component here
      
       <DynamicModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        entityType={entityType}
        mode={modalMode}
        initialData={editingData || undefined}
        onSave={handleSave}
        onDelete={modalMode === 'edit' ? handleDelete : undefined}
      />
      
      */}
    </>
  );
};

export default DashboardPage;

