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
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#1F2937', // Dark blue-gray
    },
    text: {
      primary: '#E5E7EB', // Light gray
      secondary: '#9CA3AF', // Medium gray
    },
    primary: {
      main: '#3B82F6', // Blue
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const { 
    openBox, setOpenBox,
    alertBoxMsg,
    alertBoxTitle,
  } = useContext(context);

  // const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpenBox(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={openBox}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#1F2937',
            backgroundImage: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0))',
            borderRadius: '0.75rem',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ 
          color: '#E5E7EB',
          fontSize: '1.25rem',
          fontWeight: '600',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
        }}>
          {alertBoxTitle}
        </DialogTitle>
        <DialogContent sx={{ 
          minWidth: 300,
          padding: '1.5rem',
        }}>
          <DialogContentText 
            id="alert-dialog-slide-description"
            sx={{
              color: '#E5E7EB',
              '& .text-indigo-400': { color: '#818CF8' },
              '& .text-yellow-400': { color: '#FBBF24' },
              '& .text-green-400': { color: '#34D399' },
              '& .text-red-400': { color: '#F87171' },
              '& .text-gray-300': { color: '#D1D5DB' },
              '& .text-gray-400': { color: '#9CA3AF' },
            }}
          >
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
        <DialogActions sx={{
          borderTop: '1px solid rgba(59, 130, 246, 0.2)',
          padding: '0.75rem',
        }}>
          <Button 
            onClick={handleClose}
            sx={{
              color: '#3B82F6',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              },
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
