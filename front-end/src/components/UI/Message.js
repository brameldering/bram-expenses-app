import { useEffect, useCallback } from "react";
import Card from "./Card";
import Button from "./Button";

import classes from "./Message.module.css";

const KEY_NAME_ESC = "Escape";
const KEY_NAME_ENTER = "Enter";
const KEY_EVENT_TYPE = "keyup";

// Expected props:
//   message: {header: "header", body: "body"}
//   onMessageClose: function
const Message = (props) => {
  // Close the message when the user presses the ESC key
  const handleEscKey = useCallback(
    (event) => {
      if (event.key === KEY_NAME_ESC || event.key === KEY_NAME_ENTER) {
        props.onMessageClose();
      }
    },
    [props]
  );

  // Add an event listener to the document for the ESC key
  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);

  return (
    <div className={classes.backdrop} onClick={props.onMessageClose}>
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.message.header}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message.body}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onMessageClose} autofocus={true}>
            Ok
          </Button>
        </footer>
      </Card>
    </div>
  );
};

export default Message;
