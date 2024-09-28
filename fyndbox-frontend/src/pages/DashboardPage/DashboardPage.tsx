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
import EntityActionModal from '../../components/modal/EntityActionModal';




const DashboardPage: FC = () => {
  const [expandedStorageIndex, setExpandedStorageIndex] = useState<
    number | null
  >(null);

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

  const handleEditStorage = (index: number) => {
    console.log('Edit Storage at index:', index);
  };

  const handleEditBox = (storageIndex: number, boxIndex: number) => {
    console.log(`Edit Box at index ${boxIndex} in Storage ${storageIndex}`);
  };

  const handleAddStorage = () => {
    console.log('Add Storage action triggered');
    // Implement logic to add a storage here
  };

  const handleAddBox = () => {
    console.log('Add Box action triggered');
    // Implement logic to add a box here
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
                onEdit={() => handleEditStorage(index)}
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
                      onEdit={() => handleEditBox(index, boxIndex)}
                    />
                  ))}
                  <AddEntityButton entityType="box" onAdd={handleAddBox} />
                </SubContainer>
              )}
            </Box>
          ))}
          <AddEntityButton entityType="storage" onAdd={handleAddStorage} />
          <EntityActionModal/>
         
        </MainContainer>
      </DashboardContainer>
      <DashboardFooter
        onFavoriteClick={handleFavoriteClick}
        onScanClick={handleScanClick}
        onProfileClick={handleProfileClick}
      />



    </>
  );
};

export default DashboardPage;

