import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

export default function MapDialog(props) {
  const {
    open,
    onClose,
    handleCancel,
    handleSubmit,
  } = props;
  const [name, setName] = useState('');

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setName('');
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Map</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleCancel();
            setName('');
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSubmit(name);
            setName('');
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
