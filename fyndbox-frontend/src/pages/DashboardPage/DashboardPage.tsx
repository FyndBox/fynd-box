import { FC, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';
import { CustomIcon, FullPageContainer } from '../../styles/commonStyles';
import TopBar from '../../components/TopBar/TopBar';
import SearchField from '../../components/SearchField/SearchField';
import EntityCard from '../../components/EntityCard/EntityCard';
import AddEntityButton from '../../components/AddEntityButton/AddEntityButton';
import { MainContainer, SubContainer } from './DashboardPage.styles';

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

  return (
    <>
      <TopBar />
      <FullPageContainer>
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
                onEditStorage={() => handleEditStorage(index)}
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
                      isBoxCard={true}
                      onEditBox={() => handleEditBox(index, boxIndex)}
                    />
                  ))}
                  <AddEntityButton entity="box" />
                </SubContainer>
              )}
            </Box>
          ))}
          <AddEntityButton entity="storage" />
        </MainContainer>
      </FullPageContainer>
    </>
  );
};

export default DashboardPage;
