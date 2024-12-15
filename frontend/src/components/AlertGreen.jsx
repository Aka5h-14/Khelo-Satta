import * as React from "react";
import Alert from "@mui/material/Alert";

export default function OutlinedAlerts(props) {
  const [display, setDisplay] = React.useState(true);

  setTimeout(()=>{
    setDisplay(false)
  }, 4000)
  
  return (
    <>
      {display ? (
        <Alert
          color={props.type}
          severity={props.type}
          onClose={() => {
            setDisplay(false);
          }}
        >
          {props.msg}
        </Alert>
      ) : null}
    </>
  );
}
