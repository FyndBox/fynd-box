import { FC } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ActionButtonsContainer } from '../DeleteConfirmationDialog/DeleteConfirmationDialog.styles';
import { CancelButton, ConfirmButton } from '../../styles/commonStyles';

interface DeactivateConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationDialog: FC<DeactivateConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      disableEnforceFocus
      disableRestoreFocus
    >
      <DialogTitle>{t('modal.deactivateTitle')}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          {t('modal.deactivateConfirmation')}
        </Typography>
      </DialogContent>
      <ActionButtonsContainer>
        <CancelButton variant="outlined" onClick={onCancel}>
          {t('modal.cancel')}
        </CancelButton>
        <ConfirmButton onClick={onConfirm}>
          {t('modal.deactivate')}
        </ConfirmButton>
      </ActionButtonsContainer>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
