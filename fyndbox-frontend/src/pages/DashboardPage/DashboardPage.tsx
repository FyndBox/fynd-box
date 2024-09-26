import { FC, useState } from 'react';
import { FullPageContainer } from '../../styles/commonStyles';
import TopBar from '../../components/TopBar/TopBar';
import SearchField from '../../components/SearchField/SearchField';
import EntityComponent from '../../components/EntityComponent/EntityComponent';
import { Box, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const DashboardPage: FC = () => {
  // State to track which storage is expanded
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

  // Handle the toggle of the storage's expanded state
  const handleToggleExpand = (index: number) => {
    setExpandedStorageIndex(expandedStorageIndex === index ? null : index); // Toggle expand state
  };

  return (
    <>
      <TopBar />
      <FullPageContainer>
        <SearchField />
        <Box sx={{ padding: '1px' }}>
          {storages.map((storage, index) => (
            <Box key={index}>
              <EntityComponent
                name={storage.name}
                description={storage.description}
                // Icon button to expand/collapse boxes
                iconButton={
                  <IconButton onClick={() => handleToggleExpand(index)}>
                    {expandedStorageIndex === index ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </IconButton>
                }
              />
              {/* Conditionally render boxes when storage is expanded */}
              {expandedStorageIndex === index && (
                <Box sx={{ marginLeft: '20px', marginTop: '1px' }}>
                  {storage.boxes?.map((box, boxIndex) => (
                    <EntityComponent
                      key={boxIndex}
                      name={box.name}
                      description={box.description}
                    />
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </FullPageContainer>
    </>
  );
};

export default DashboardPage;
