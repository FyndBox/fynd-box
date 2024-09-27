import { FC } from 'react';
import { Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import {
  AddEntityContainer,
  FabContainer,
  Label,
} from './AddEntityButton.styles';

interface AddEntityButtonProps {
  entity: string;
}

const AddEntityButton: FC<AddEntityButtonProps> = ({ entity }) => {
  const { t } = useTranslation();

  const getLabel = (entity: string): string => {
    switch (entity) {
      case 'storage':
        return t('dashboard.entity.addStorage');
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
        <Label variant="h6">{getLabel(entity)}</Label>
        <FabContainer aria-label="add">
          <AddIcon />
        </FabContainer>
      </Stack>
    </AddEntityContainer>
  );
};

export default AddEntityButton;
