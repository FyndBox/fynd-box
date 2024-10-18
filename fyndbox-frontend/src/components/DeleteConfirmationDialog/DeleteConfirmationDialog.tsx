import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import {CancelButton, DeleteButton} from './DeleteConfirmationDialog.styles'

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  entityName?: string; 
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  entityName 
}) => {
  return (
      <Dialog
        open={isOpen}
        onClose={onCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {entityName ? `Delete "${entityName}"?` : 'Confirm Deletion'}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete {entityName ? `"${entityName}"` : 'this item'}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onCancel} >
            Cancel
          </CancelButton>
          <DeleteButton onClick={onConfirm} >
             Delete
          </DeleteButton>
        </DialogActions>
      </Dialog>
      );
    };

export default DeleteConfirmationDialog;
