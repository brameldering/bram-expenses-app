import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Message.css";

const messageStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Message = (props) => {
  return (
    <>
      <Modal
        open={props.statusModalOpen}
        onClose={props.handleStatusModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={messageStyle}>
          <Typography id='modal-modal-title' variant='h6' component='h2' align='center'>
            {props.statusModalTitle}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }} align='center'>
            {props.statusModalMessage}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Message;
