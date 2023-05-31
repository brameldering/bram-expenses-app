import classes from "./Message.module.css";

// an enum of possible message types, being "info", "warning", "error"
export const MESSAGE_TYPE = {
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

const MessageTypeClassName = (messageType) => {
  // Set header to be the appropriate class name
  let classNameString = "";
  switch (messageType) {
    case MESSAGE_TYPE.WARNING:
      classNameString = `${classes.header} ${classes.warning}`;
      break;
    case MESSAGE_TYPE.ERROR:
      classNameString = `${classes.header} ${classes.error}`;
      break;
    default: // MESSAGE_TYPE.INFO
      classNameString = `${classes.header} ${classes.info}`;
  }
  return classNameString;
};

export default MessageTypeClassName;
