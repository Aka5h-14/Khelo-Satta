import * as React from "react";
import Alert from "@mui/material/Alert";

export default function OutlinedAlerts(props) {
  // const [display, setDisplay] = React.useState(true);

  if (props.display == true) {
    setTimeout(() => {
      props.setDisplay(false);
    }, 4000);
  }

  return (
    <>
      {props.display ? (
        <Alert
          color={props.type}
          severity={props.type}
          onClose={() => {
            props.setDisplay(false);
          }}
        >
          {props.msg}
        </Alert>
      ) : null}
    </>
  );
}
