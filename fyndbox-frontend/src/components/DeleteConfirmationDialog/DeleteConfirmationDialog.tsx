import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { CancelButton, DeleteButton } from './DeleteConfirmationDialog.styles';
import { EntityType } from '../../types/entityTypes';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  entityName?: string; 
  entityType: EntityType;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen, 
  onConfirm, 
  onCancel, 
  entityName,
  entityType,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="delete-dialog-title">
        {`Delete "${entityName || entityType || 'item'}"?`}
      </DialogTitle>
      <DialogContent dividers>
        <Typography id="delete-dialog-description">
          Are you sure you want to delete {`"${entityName || entityType || 'this item'}"`}? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <CancelButton variant="outlined" onClick={onCancel}>
          Cancel
        </CancelButton>
        <DeleteButton onClick={onConfirm}>
          Delete
        </DeleteButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
