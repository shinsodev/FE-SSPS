import { Box, Typography } from "@mui/material";

import pdfImage from "../../assets/img/pdf.png";
import docxImage from "../../assets/img/docx.png";

function FileComp(props) {
  const { file, select, isSelect } = props;
  function clickData() {
    if (isSelect) {
      return;
    }
    select(file.id);
  }
  return (
    <>
      <Box
        width={"120px"}
        height={"150px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 1,
          borderRadius: "2px",
          transition: "background-color 0.1s ease, opacity 0.1s ease",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          backgroundColor: isSelect ? "rgba(0, 0, 0, 0.1)" : "none",
        }}
        onClick={clickData}
      >
        <img
          src={file.type === "pdf" ? pdfImage : docxImage}
          width="100px"
          height="auto"
          style={{
            marginTop: "10px",
          }}
        />
        <Typography variant="subtitle1" sx={{ opacity: "0.8" }} mt={1}>
          {file.name.length > 13 ? `${file.name.slice(0, 13)}...` : file.name}
        </Typography>
      </Box>
    </>
  );
}
export default FileComp;
