import React from 'react';
import { Button, Dialog, DialogActions ,DialogContent,DialogContentText,DialogTitle} from '@mui/material';


const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" autoFocus>
          确认
        </Button>
        <Button onClick={onCancel} color="primary">
          取消
        </Button>
       
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;