import { FC } from 'react';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box as FavBox } from '../../types/box';
import { useUpdateBox } from '../../hooks/useBox';
import FavCard from '../FavCard/FavCard';
import { useTranslation } from 'react-i18next';

const FavoritesSidebar: FC<{
  open: boolean;
  favorites: FavBox[] | undefined;
  onClose: () => void;
}> = ({ open, favorites, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: updateBox } = useUpdateBox();

  const handleBoxOpen = (storageId: string, boxId: string) => {
    navigate(`/box/${storageId}/${boxId}`);
    onClose();
  };

  const handleToggleFavorite = (box: FavBox) => {
    if (box && box.storageId) {
      updateBox({
        boxId: box.id,
        storageId: box.storageId,
        boxData: {
          ...box,
          isFavorite: !box.isFavorite,
        },
      });
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box display="flex" alignItems="center" p={2}>
        <Typography variant="h5" textAlign="center">
          {t('favoritesSidebar.title')}
        </Typography>
      </Box>
      <Divider orientation="horizontal" />
      {favorites && favorites.length > 0 ? (
        favorites.map((box, boxIndex) => (
          <FavCard
            key={boxIndex}
            name={box.name}
            description={box.description || ''}
            image={box.image || ''}
            onDelete={() => handleToggleFavorite(box)}
            onClick={() => handleBoxOpen(box.storageId!!, box.id)}
          />
        ))
      ) : (
        <Typography variant="h6" textAlign="center" color="textSecondary">
          {t('favoritesSidebar.noItemsFound')}
        </Typography>
      )}
    </Drawer>
  );
};

export default FavoritesSidebar;
