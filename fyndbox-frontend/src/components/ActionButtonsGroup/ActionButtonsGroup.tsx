import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Delete } from '@mui/icons-material';
import { ButtonsGroupWrapper, CustomIcon } from '../../styles/commonStyles';
import { DeleteButton, SaveButton } from './ActionButtonsGroup.styles';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import { EntityType } from '../../types/entityTypes';

interface ActionButtonsGroupProps {
  showDeleteButton?: boolean;
  entityType: EntityType;
  onSaveClick?: (data?: any) => void;
  onDeleteClick?: () => void;
}

const ActionButtonsGroup: FC<ActionButtonsGroupProps> = ({
  showDeleteButton = false,
  entityType,
  onSaveClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (onDeleteClick) {
      onDeleteClick();
    }
    handleCloseDeleteDialog();
  };

  return (
    <>
      <ButtonsGroupWrapper>
        <SaveButton
          variant="contained"
          fullWidth
          startIcon={
            <CustomIcon>
              <Check />
            </CustomIcon>
          }
          onClick={() => onSaveClick && onSaveClick()}
        >
          {t('modal.save')}
        </SaveButton>

        {showDeleteButton && (
          <DeleteButton
            variant="contained"
            fullWidth
            startIcon={
              <CustomIcon>
                <Delete />
              </CustomIcon>
            }
            onClick={handleOpenDeleteDialog}
          >
            {t('modal.delete')}
          </DeleteButton>
        )}
      </ButtonsGroupWrapper>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteDialog}
        entityType={entityType}
      />
    </>
  );
};

export default ActionButtonsGroup;
