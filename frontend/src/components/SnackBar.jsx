import * as React from 'react';
import context from './MyContext';
import { useContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function AutohideSnackbar() {
  // const [open, setOpen] = React.useState(false);

  const {open, setOpen , alertMsg, alertSeverity} = useContext(context);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}>
        <Alert
            onClose={handleClose}
            severity={alertSeverity || "warning"}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {alertMsg}
        </Alert>
        </Snackbar>
    </div>
  );
}
