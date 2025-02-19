import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import context from './MyContext';
import { useContext } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const { openBox ,setOpenBox,
    alertBoxMsg, setAlertBoxMsg, alertBoxTitle, setAlertBoxTitle,
    alertBoxSeverity, setAlertBoxSeverity,} = useContext(context);

  // const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpenBox(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openBox}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ minWidth: '400px' }}
      >
        <DialogTitle>{alertBoxTitle}</DialogTitle>
        <DialogContent sx={{ minWidth: 250 }}>
          <DialogContentText id="alert-dialog-slide-description">

          <div dangerouslySetInnerHTML={{ __html: alertBoxMsg }} />

            
          {/* How to play<br/>1 Enter the bet amount<br/>2 Click the add bet button<br/>3 Enter the number of mines<br/>4 Click the play button<br/>5 Play the game by clicking on the tiles<br/> <br/>You can cashout the amount using the Cash Out button */}

            {/* <p>1 Enter the bet amount</p>
            <p>2 Click the add bet button</p>
            <p>3 Enter the number of mines</p>
            <p>4 Click the play button</p>
            <p>5 Play the game by clicking on the tiles</p>
            <p>You can cashout the amount using the Cash Out button</p> */}

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
