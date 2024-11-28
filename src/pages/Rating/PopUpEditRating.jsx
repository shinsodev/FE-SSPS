import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid2, Rating, Stack } from "@mui/material";
import { notifyError } from "../../components/Notification/NotifyError";
import axios from "../../services/customize-axios";
import { notifySuccess } from "../../components/Notification/NotifySuccess";

export default function EditRatingPopUp(props) {
  const { closeEdit, restoreDefault } = props;
  const [idRating, setIdRating ] =  React.useState(props.data.id);
  const [open, setOpen] = React.useState(props.open);
  const [rating, setRating] = React.useState(props.data.rating);
  const [comment, setComment] = React.useState(props.data.comment);
  const [reload, setReload] = React.useState(0);
  const handleClose = () => {
    closeEdit();
  };

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open, reload]);

  async function updateRating() {
    const token = localStorage.getItem("token");
    const dataUpdate = {
      rating: Number(rating),
      comment: String(comment),
    };
    try {
      const result = await axios.patch(
        `/ssps/students/update-rating/${idRating}`,
        dataUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        notifySuccess("Update success");
        restoreDefault();
        props.reloadData();
        // window.location.reload()
      } else {
        throw "Update rating failed!!!";
      }
    } catch (err) {
      notifyError("Update rating failed!!!");
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
        fullWidth
      >
        <DialogTitle
          alignSelf={"center"}
          className="font-medium text-3xl"
          color="#6A88B9"
        >
          EDIT RATING ID {idRating}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={2}>
            {/* Rating */}
            <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"flex-start"}
                fontWeight={"bold"}
              >
                Rating:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Grid2>
            </Grid2>
            {/* Comment */}
            <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"flex-start"}
                fontWeight={"bold"}
              >
                Comment:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  size="small"
                  fullWidth
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={updateRating}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
