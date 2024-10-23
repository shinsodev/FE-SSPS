import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import FileComp from "./FileComponent";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const listFile = [
  { type: "pdf", name: "file1", id: 1 },
  { type: "pdf", name: "file1", id: 2 },
  { type: "pdf", name: "file1", id: 3 },
  { type: "pdf", name: "file1", id: 4 },
  { type: "pdf", name: "file1", id: 5 },
  { type: "pdf", name: "file1", id: 6 },
  { type: "pdf", name: "file1", id: 7 },
];
function SelectFile() {
  const [fileSelect, setFileSelect] = useState(null);

  function select(id) {
    setFileSelect(id);
  }

  function handleCancel() {
    setFileSelect(null);
  }

  const navigate = useNavigate();

  function handleSubmit() {
    const userId = 5;
    const fileId = fileSelect;
    navigate(`/printers/${userId}/${fileId}`);
  }

  return (
    <>
      <Stack spacing={3} alignItems={"center"} mt={5}>
        <Typography variant="h3" textAlign={"center"} sx={{ color: "#6A88B9" }}>
          SELECT FILE
        </Typography>

        <Box
          component="section"
          width={{ sm: "70%", md: "55%" }}
          height={{ sm: "550px", md: "450px" }}
          sx={{
            p: 2,
            border: "2px dashed grey",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            // alignItems: "center",
            overflow: "auto",
          }}
        >
          {listFile.map((item) =>
            item.id === fileSelect ? (
              <FileComp
                file={item}
                key={item.id}
                select={select}
                isSelect={true}
              />
            ) : (
              <FileComp
                file={item}
                key={item.id}
                select={select}
                isSelect={false}
              />
            )
          )}
        </Box>

        {fileSelect != null && (
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
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleSubmit}
                >
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
export default SelectFile;
