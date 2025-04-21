import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./styles.scss";

interface DialogComponentProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: React.ReactNode;
  handleSubmit?: () => void;
  isDisabled: boolean;
  isHaveRightButton?: boolean;
}

export const DialogComponent = (props: DialogComponentProps) => {
  const {
    open,
    handleClose,
    title,
    content,
    handleSubmit,
    isDisabled,
    isHaveRightButton = true,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="dialog-title" id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent className="dialog-content">{content}</DialogContent>
      <DialogActions className="dialog-actions">
        <Button
          disabled={isDisabled}
          onClick={handleClose}
          className="cancel-button"
          variant="contained"
        >
          Cancel
        </Button>
        {isHaveRightButton && (
          <Button
            disabled={isDisabled}
            onClick={handleSubmit}
            className="submit-button"
            variant="contained"
            autoFocus
          >
            {isDisabled ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Create"
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
