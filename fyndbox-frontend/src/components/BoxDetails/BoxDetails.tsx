import { FC } from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import {
  BoxDetailsContainer,
  ImageBox,
  ImageContainer,
} from './BoxDetails.styles';
import BoxIconSvg from '../../assets/box-icon-black.svg';
import { useTranslation } from 'react-i18next';

interface BoxDetailsProps {
  name: string;
  description?: string;
  image?: string;
  isFavorite?: boolean;
  onToggleFavorite: () => void;
}

const BoxDetails: FC<BoxDetailsProps> = ({
  name,
  description,
  image,
  isFavorite,
  onToggleFavorite,
}) => {
  const { t } = useTranslation();
  return (
    <BoxDetailsContainer>
      <ImageContainer flex={1}>
        {image ? (
          <ImageBox src={image} alt={name} />
        ) : (
          <ImageBox src={BoxIconSvg} alt={'Box Icon'} />
        )}
      </ImageContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        {/* Left side with box name and description */}
        <Stack spacing={0.5}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Stack>

        {/* Right side with favorite icon */}
        <Stack alignItems="center">
          <IconButton onClick={onToggleFavorite}>
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2">
            {isFavorite ? t('box.removeFavorite') : t('box.addFavorite')}
          </Typography>
        </Stack>
      </Stack>
    </BoxDetailsContainer>
  );
};

export default BoxDetails;
