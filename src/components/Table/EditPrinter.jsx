import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CardMedia, Grid2, MenuItem, Select, Stack } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import printer1 from "../../assets/img/printer1.webp";
import { updatePrinter } from "../../services/AdminService";
import { useNavigate } from "react-router-dom";
export default function EditDialog(props) {
  const navigate = useNavigate();
  const { setOpenEdit } = props;
  const [printerID, setPrinterID] = React.useState("");
  const [open, setOpen] = React.useState(props.open);
  const [printerLocation, setPrinterLocation] = React.useState("None");
  const [availableDocTypeString, setAvailableDocTypeString] = React.useState('');
  const [status, setStatus] = React.useState("None");
  const [papersLeft, setPapersLeft] = React.useState(0);
  const [openImage, setOpenImage] = React.useState(false);
  const handleClickOpen = () => {
    setOpenEdit(true);
    // setOpen(true);
  };

  const handleOnApply =  ()  => {
    const token = localStorage.getItem('token');
    const availableDocType = availableDocTypeString.split(',').map((item) => item.trim());
    const response = updatePrinter(token, printerID, printerLocation, status, papersLeft, availableDocType);
    window.location.reload();
  }

  const handleClose = () => {
    // setOpen(false);
    setOpenEdit(false);
  };

  function handleCloseImage() {
    setOpenImage(false);
  }

  // const handleAvailabDoctypeOnChange = (e) =>{
  //   setAvailableDocType(e.target.value)
  // }
  // const handleAvailabDoctypeOnChange = (e) => {
  //   // Split the input value by commas and remove any leading/trailing spaces
  //   const docTypeArray = e.target.value.split(',').map(item => item.trim());
  //   // Update the state with the array
  //   setAvailableDocType(docTypeArray);
  // };
  const handleAvailabDoctypeStringOnChange = (e) => {
    setAvailableDocTypeString(e.target.value)
  };
  

  const handlePrinterLocationOnChange = (e) => {
    setPrinterLocation(e.target.value);
  }

  // const handlePapersLeftOnChange = (e) => {
  //   setPapersLeft(e.target.value);
  // }
  const handlePapersLeftOnChange = (e) => {
    // Parse the value to ensure it's a number
    const newValue = parseInt(e.target.value, 10) || 0; // Fallback to 0 if NaN
    setPapersLeft(newValue);
  };

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  React.useEffect(() => {
    if (props.printer) {
      setPrinterID(props.printer.printerID || 0);
      setPrinterLocation(props.printer.printerLocation || "None");
      setAvailableDocTypeString(props.printer.availableDocType.join(", ") || "");
      setStatus(props.printer.status || "None");
      setPapersLeft(props.printer.papersLeft || 0);
    }
  }, [props.printer]); // Update when printer changes
  
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
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
          EDIT PRINTER
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "50%", cursor: "pointer" }}
                image={printer1}
                alt="Printer image"
                onClick={() => setOpenImage(true)}
              />
            </Box>
            {/* ID */}
            <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                {/* <Item>size=8</Item> */}
                ID Printer:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                {/* <Item>size=4</Item> */}
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  value={printerID}
                  disabled
                  fullWidth
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.action.disabledBackground,
                  }
                  }
                />
              </Grid2>
            </Grid2>
            {/* Name */}
            {/* <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                Name:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  value={"Printer1"}
                  fullWidth
                />
              </Grid2>
            </Grid2> */}
            {/* Model */}
            <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                AvailabDoctype:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  value={availableDocTypeString}
                  fullWidth
                  onChange={handleAvailabDoctypeStringOnChange}
                />
              </Grid2>
            </Grid2>
            {/* Location */}
            <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                {/* <Item>size=8</Item> */}
                Location:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  value={printerLocation}
                  fullWidth
                  onChange={handlePrinterLocationOnChange}
                />
              </Grid2>
              {/* <Grid2 size={{ xs: 12, sm: 9 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={position}
                  size="small"
                  fullWidth
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <MenuItem value={10}>CS1</MenuItem>
                  <MenuItem value={20}>CS2</MenuItem>
                </Select>
              </Grid2> */}
            </Grid2>
            {/* Paper left */}
            <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                Paper left:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  defaultValue={papersLeft}
                  slotProps={{ htmlInput: { min: 0, step: 1 } }}
                  fullWidth
                  onChange={handlePapersLeftOnChange}
                />
              </Grid2>
            </Grid2>
            {/* Status */}
            {/* <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                Status:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  size="small"
                  fullWidth
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {/* Running */}
                  {/* <MenuItem
                    value={"Running"}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <CircleIcon sx={{ color: "green", width: "17px" }} />{" "}
                      <span
                        style={{
                          marginLeft: 5,
                        }}
                      >
                        ONLINE
                      </span>
                    </div>
                  </MenuItem> */}
                  {/* Maintaince */}
                  {/* <MenuItem
                    value={"Maintaince"}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <CircleIcon sx={{ color: "orange", width: "17px" }} />{" "}
                      <span
                        style={{
                          marginLeft: 5,
                        }}
                      >
                        Maintaince
                      </span>
                    </div>
                  </MenuItem> */}
                  {/* Error */}
                  {/* <MenuItem
                    value={"Running"}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <CircleIcon sx={{ color: "red", width: "17px" }} />{" "}
                      <span
                        style={{
                          marginLeft: 5,
                        }}
                      >
                        OFFLINE
                      </span>
                    </div>
                  </MenuItem>
                </Select>
              </Grid2>
            </Grid2> */} 
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#1976d2" }}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleOnApply}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openImage}
        onClose={handleCloseImage}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Đặt nền mờ
            backdropFilter: "blur(5px)", // Hiệu ứng mờ
          },
        }}
        PaperProps={{
          sx: { backgroundColor: "transparent", boxShadow: "none" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          onClick={handleCloseImage} // Đóng Dialog khi nhấp vào bất kỳ vị trí nào
        >
          <CardMedia
            component="img"
            sx={{ width: "90%", maxWidth: "100%", cursor: "pointer" }}
            image={printer1}
            alt="Printer"
          />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
