import { useState } from 'react';

const UseConfirmDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => {});

  const showConfirmDialog = (title, message, onConfirm) => {
    setTitle(title);
    setMessage(message);
    setOnConfirmCallback(() => onConfirm);
    setOpen(true);
  };

  const handleConfirm = () => {
    onConfirmCallback();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return {
    open,
    title,
    message,
    handleConfirm,
    handleCancel,
    showConfirmDialog,
  };
};

export default UseConfirmDialog;