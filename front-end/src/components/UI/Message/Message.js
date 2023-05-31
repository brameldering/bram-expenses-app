import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import Card from "../Card/Card";
import Button from "../Button/Button";

import classes from "./Message.module.css";
import MessageTypeClassName from "./MessageTypeClassName";

const KEY_NAME_ESC = "Escape";
const KEY_NAME_ENTER = "Enter";
const KEY_EVENT_TYPE = "keyup";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onMessageClose}></div>;
};

const ModalOverlay = (props) => {
  const classNameString = MessageTypeClassName(props.message.type);
  console.log("classNameString: " + classNameString);
  return (
    <Card className={classes.modal}>
      <header className={classNameString}>
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
  );
};

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
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onMessageClose={props.onMessageClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onMessageClose={props.onMessageClose} message={props.message} />,
        document.getElementById("overlay-root")
      )}
      ;
    </React.Fragment>
  );
};

export default Message;
