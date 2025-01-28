import { FC } from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box as FavBox } from '../../types/box';
import { useUpdateBox } from '../../hooks/useBox';
import FavCard from '../FavCard/FavCard';

const FavoritesSidebar: FC<{
  open: boolean;
  favorites: FavBox[] | undefined;
  onClose: () => void;
}> = ({ open, favorites, onClose }) => {
  const navigate = useNavigate();
  const { mutate: updateBox } = useUpdateBox();

  const handleBoxOpen = (storageId: string, boxId: string) => {
    navigate(`/box/${storageId}/${boxId}`);
    onClose();
  };

  // Handle toggling the favorite status
  const handleToggleFavorite = (box: FavBox) => {
    console.log('Box:', box);
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
        <h1>Favorite Boxes</h1>
      </Box>
      <Divider orientation="horizontal" />
      {favorites && favorites.length > 0 ? (
        favorites.map((box, boxIndex) => (
          <FavCard
            key={boxIndex}
            name={box.name}
            image={box.image || ''}
            onDelete={() => handleToggleFavorite(box)}
            onClick={() => handleBoxOpen(box.storageId!!, box.id)}
          />
        ))
      ) : (
        <p>No favorites yet!</p>
      )}
    </Drawer>
  );
};

export default FavoritesSidebar;
