import { useTheme } from "@emotion/react";
import { Button, Grid2, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectComponent from "./SelectComponent";
import { notifySuccess } from "../../components/Notification/NotifySuccess";
const listSelect = ["ab1", "ab2", "ab3", "ab4", "ab5", "ab6", "ab7", "ab8"];

function FileConfigurationPage() {
  const { userId, fileId } = useParams();

  const navigate = useNavigate();
  function handleCancel() {
    navigate("/printers");
  }

  function handleSubmit() {
    notifySuccess("Configuration file success");
    navigate("/printers");
  }

  return (
    <>
      <Stack spacing={3} alignItems={"center"} mt={5}>
        <Typography variant="h3" textAlign={"center"} sx={{ color: "#6A88B9" }}>
          CONFIGURATION FILE
        </Typography>

        <Stack
          width={"70%"}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
          spacing={2}
        >
          {/* Orientation */}
          <Grid2 container width={"100%"} spacing={1}>
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{
                alignContent: "center",
                fontSize: 27,
                fontWeight: "bold",
                opacity: "90%",
              }}
            >
              Orientation:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent listSelect={listSelect} label={"Orientation"} />
            </Grid2>
          </Grid2>
          {/* Print type */}
          <Grid2 container width={"100%"} spacing={1}>
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{
                alignContent: "center",
                fontSize: 27,
                fontWeight: "bold",
                opacity: "90%",
              }}
            >
              Print type:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent listSelect={listSelect} label={"Print type"} />
            </Grid2>
          </Grid2>
          {/* Print one side */}
          <Grid2 container width={"100%"} spacing={1}>
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{
                alignContent: "center",
                fontSize: 27,
                fontWeight: "bold",
                opacity: "90%",
              }}
            >
              Print one side:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent
                listSelect={listSelect}
                label={"Print one side"}
              />
            </Grid2>
          </Grid2>
          {/* Letter */}
          <Grid2 container width={"100%"} spacing={1}>
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{
                alignContent: "center",
                fontSize: 27,
                fontWeight: "bold",
                opacity: "90%",
              }}
            >
              Letter:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent listSelect={listSelect} label={"Letter"} />
            </Grid2>
          </Grid2>
          {/* Paper type */}
          <Grid2 container width={"100%"} spacing={1}>
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{
                alignContent: "center",
                fontSize: 27,
                fontWeight: "bold",
                opacity: "90%",
              }}
            >
              Paper type:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent listSelect={listSelect} label={"Paper type"} />
            </Grid2>
          </Grid2>
          {/* Print copies */}
          <Grid2 container width={"100%"} spacing={1}>
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{
                alignContent: "center",
                fontSize: 27,
                fontWeight: "bold",
                opacity: "90%",
              }}
            >
              Print copies:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent listSelect={listSelect} label={"Print copies"} />
            </Grid2>
          </Grid2>
        </Stack>

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
      </Stack>
    </>
  );
}
export default FileConfigurationPage;
