import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DialogComponentProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const DialogComponent = (props: DialogComponentProps) => {
  const { open, handleClose, title, content } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
