import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog(props) {
  const { printerId, closeDialog, submitDelete } = props;
  const [open, setOpen] = React.useState(props.openD);

  const handleClose = () => {
    closeDialog();
  };

  async function submitDeletePrinter() {
    try {
      await submitDelete();
    } catch (err) {
      console.error(err.message);
    }
  }

  React.useEffect(() => {
    setOpen(props.openD);
  }, [props.openD]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          color="#2962ff"
          textAlign={"center"}
        >
          DELETE PRINTER
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this printer id {printerId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            size="small"
            color="warning"
          >
            Disagree
          </Button>
          <Button
            variant="contained"
            onClick={submitDeletePrinter}
            size="small"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}