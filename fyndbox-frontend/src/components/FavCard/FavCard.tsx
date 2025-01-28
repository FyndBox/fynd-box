import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { ImageBox } from '../EntityCard/EntityCard.styles';
import BoxIconSvg from '../../assets/box-icon-black.svg';
import { FavCardContainer } from './FavCard.styles';

interface FavCardProps {
  name: string;
  image: string;
  onDelete: () => void;
  onClick: () => void;
}

const FavCard: FC<FavCardProps> = ({ name, image, onDelete, onClick }) => {
  return (
    <FavCardContainer onClick={onClick}>
      <Box display="flex" alignItems="center">
        <Box flex={1}>
          {image ? (
            <ImageBox src={image} alt={name} />
          ) : (
            <ImageBox src={BoxIconSvg} alt={'Box Icon'} />
          )}
        </Box>
        <Box ml={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Delete />
      </IconButton>
    </FavCardContainer>
  );
};

export default FavCard;
