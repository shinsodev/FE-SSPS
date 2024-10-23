import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import FileComp from "../Printer/FileComponent";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
function UploadFilePage() {
  const [file, setFile] = useState(null);

  function handleUploadFile(e) {
    const fileData = e.target.files[0];
    // pdf file
    if (fileData.type === "application/pdf") {
      console.log("oke");
      setFile({ type: "pdf", name: fileData.name });
    } else if (
      fileData.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // file type docx
      setFile({ type: "docx", name: fileData.name });
    }
    // console.log(fileData);
  }

  function handleCancel(e) {
    setFile(null);
  }

  return (
    <>
      <Stack spacing={3} alignItems={"center"} mt={5}>
        <Typography variant="h3" textAlign={"center"}>
          SPSO SMART PRINTING
        </Typography>
        <Typography variant="h5">Select file to upload</Typography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleUploadFile} />
        </Button>
        {file !== null && (
          <>
            <Box
              component="section"
              sx={{
                p: 2,
                border: "1px dashed grey",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FileComp file={file} />
            </Box>
          </>
        )}

        {file != null && (
          <Stack
            width={"70%"}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid2
              container
              spacing={2}
              width={"100%"}
              textAlign={"center"}
              mt={5}
            >
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Button variant="contained" color="success" size="large">
                  Submit
                </Button>
              </Grid2>
            </Grid2>
          </Stack>
        )}
      </Stack>
    </>
  );
}
export default UploadFilePage;
