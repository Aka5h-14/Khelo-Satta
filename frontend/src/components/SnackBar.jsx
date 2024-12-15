import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function AutohideSnackbar(props) {
  const [open, setOpen] = React.useState(true);

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
            severity="warning"
            variant="filled"
            sx={{ width: '100%' }}
        >
            {props.message}
        </Alert>
        </Snackbar>
    </div>
  );
}
