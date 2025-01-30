import { FC } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ActionButtonsContainer,
  CancelButton,
  ConfirmButton,
} from '../../styles/commonStyles';

interface ConfirmationDialogProps {
  isOpen: boolean;
  titleKey: string;
  messageKey: string;
  confirmButtonTextKey: string;
  titleParams?: Record<string, string>;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  isOpen,
  titleKey,
  messageKey,
  confirmButtonTextKey,
  titleParams = {},
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
      <DialogTitle>{t(titleKey, titleParams)}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">{t(messageKey, titleParams)}</Typography>
      </DialogContent>
      <ActionButtonsContainer>
        <CancelButton variant="outlined" onClick={onCancel}>
          {t('modal.cancel')}
        </CancelButton>
        <ConfirmButton onClick={onConfirm}>
          {t(confirmButtonTextKey)}
        </ConfirmButton>
      </ActionButtonsContainer>
    </Dialog>
  );
};

export default ConfirmationDialog;
