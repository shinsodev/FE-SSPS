import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CardMedia, Grid2, Stack } from "@mui/material";
import printer1 from "../../assets/img/printer1.webp";

export default function PrinterDetail(props) {
  const { closeDetailDialog, detailPrinter } = props;
  const [open, setOpen] = React.useState(props.open);
  const [openImage, setOpenImage] = React.useState(false);
  const [availableDocType, setAvailableDocType] = React.useState("");

  const handleClose = () => {
    closeDetailDialog();
  };

  function handleCloseImage() {
    setOpenImage(false);
  }

  function handleDocType(data) {
    let arrDocType = "";
    const lengthList = detailPrinter.availableDocType.length;
    detailPrinter.availableDocType.map((item, index) => {
      switch (item) {
        case "application/pdf":
          arrDocType += "pdf";
          break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          arrDocType += "excel";
          break;
        case "image/tiff":
          arrDocType += "TIFF";
          break;
        case "image/jpeg":
          arrDocType += "jpeg";
          break;
        case "image/gif":
          arrDocType += "gif";
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          arrDocType += "doc";
      }
      if (index !== lengthList - 1) {
        arrDocType += ", ";
      }
    });
    setAvailableDocType(arrDocType);
  }

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  React.useEffect(() => {
    handleDocType();
  }, []);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle
          alignSelf={"center"}
          className="font-medium text-3xl"
          color="#6A88B9"
        >
          PRINTER DETAIL
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
                ID Printer:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  value={detailPrinter.printerID}
                  fullWidth
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.action.disabledBackground,
                  }}
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
                Location:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  value={detailPrinter.printerLocation}
                  fullWidth
                />
              </Grid2>
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
                  value={detailPrinter.papersLeft}
                  fullWidth
                />
              </Grid2>
            </Grid2>
            {/* Status */}
            <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                Status:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  value={detailPrinter.status}
                  fullWidth
                />
              </Grid2>
            </Grid2>
            {/* Available doc type */}
            <Grid2 container spacing={1}>
              <Grid2
                size={{ xs: 12, sm: 2 }}
                alignSelf={"center"}
                fontWeight={"bold"}
              >
                Available Doc type:
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 9 }}>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  size="small"
                  value={availableDocType}
                  fullWidth
                />
              </Grid2>
            </Grid2>
          </Stack>
        </DialogContent>
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
