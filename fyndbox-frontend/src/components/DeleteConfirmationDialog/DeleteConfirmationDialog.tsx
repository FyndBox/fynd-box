import { FC } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import {
  ActionButtonsContainer,
  CancelButton,
  DeleteButton,
} from './DeleteConfirmationDialog.styles';
import { EntityType } from '../../types/entityTypes';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  entityType: EntityType;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  entityType,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>
        {t('modal.deleteTitle', { type: t(`types.${entityType}`) })}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          {t('modal.deleteConfirmation', { type: t(`types.${entityType}`) })}
        </Typography>
      </DialogContent>
      <ActionButtonsContainer>
        <CancelButton variant="outlined" onClick={onCancel}>
          {t('modal.cancel')}
        </CancelButton>
        <DeleteButton onClick={onConfirm}> {t('modal.delete')}</DeleteButton>
      </ActionButtonsContainer>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
