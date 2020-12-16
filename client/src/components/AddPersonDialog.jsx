import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AddAttendeeDialog({
  colleges,
  handleClose,
  handleSubmit,
}) {
  const [name, setName] = useState('');
  const [college, setCollege] = useState(null);
  return (
    <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
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
        <Autocomplete
          id="combo-box-demo"
          options={colleges}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => setCollege(value)}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          renderInput={(params) => <TextField {...params} label="College" variant="outlined" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit({ name, college })} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
