import { CardContent, Typography, IconButton, Stack, Box } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { FC, ReactNode } from 'react';
import { EntityCardContainer, ImageBox } from './EntityCard.styles';
import StorageIconSvg from '../../assets/storage-icon.svg';
import BoxIconSvg from '../../assets/box-icon.svg';
import { CustomIcon } from '../../styles/commonStyles';

interface EntityCardProps {
  name: string;
  description: string;
  iconButton?: ReactNode;
  isBoxCard?: boolean;
  image?: string;
  onEditStorage?: () => void;
  onEditBox?: () => void;
}

const EntityCard: FC<EntityCardProps> = ({
  name,
  description,
  iconButton,
  isBoxCard = false,
  image,
  onEditStorage,
  onEditBox,
}) => {
  return (
    <EntityCardContainer isBoxCard={isBoxCard}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex={1}>
            {image ? (
              <ImageBox src={image} alt={name} />
            ) : (
              <ImageBox
                src={isBoxCard ? BoxIconSvg : StorageIconSvg}
                alt={isBoxCard ? 'Box Icon' : 'Storage Icon'}
              />
            )}
          </Box>

          <Box flex={2}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">{description}</Typography>
          </Box>

          <Box flex={1}>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={isBoxCard ? onEditBox : onEditStorage}>
                <CustomIcon>
                  <Edit />
                </CustomIcon>
              </IconButton>
              {iconButton && iconButton}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </EntityCardContainer>
  );
};

export default EntityCard;
