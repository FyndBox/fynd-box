import { FC} from 'react';
import { Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import {
  AddEntityContainer,
  FabContainer,
  Label,
} from './AddEntityButton.styles';
import { EntityType } from '../../types/entityTypes';

interface AddEntityButtonProps {
  entityType: EntityType;
  onAdd?: () => void;
}
 
const AddEntityButton: FC<AddEntityButtonProps> = ({
  entityType = 'storage',
  onAdd
}) => {
  const { t } = useTranslation();

  const getLabel = (entityType: string): string => {
    switch (entityType) {
      case 'box':
        return t('dashboard.entity.addBox');
      case 'item':
        return t('dashboard.entity.addItem');
      default:
        return t('dashboard.entity.addStorage');
    }
  };

  return (
    <AddEntityContainer>
      <Stack direction="row" textAlign="center" alignItems="center" spacing={2}>
        <Label variant="h6">{getLabel(entityType)}</Label>
        <FabContainer aria-label="add" onClick={onAdd}>
          <AddIcon />
        </FabContainer>
      </Stack>
    </AddEntityContainer>
  );
};

export default AddEntityButton;
