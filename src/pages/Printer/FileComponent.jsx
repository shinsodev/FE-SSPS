import { Box, Typography } from "@mui/material";

import pdfImage from "../../assets/img/pdf.png";
import docxImage from "../../assets/img/docx.png";
import imageImage from "../../assets/img/jpg.png";
import excelImage from "../../assets/img/R.jpg";

function FileComp(props) {
  const { file, select, isSelect } = props;

  function clickData() {
    if (isSelect) {
      return;
    }
    select(file.id);
  }

  // Kiểm tra loại tệp và chọn biểu tượng tương ứng
  const getFileIcon = () => {

    if (file.type === "pdf") {
      return pdfImage;
    }
    if (file.type === "docx") {
      return docxImage;
    }

    // Kiểm tra nếu là một file ảnh
    if (file.type === "image") {
      //console.log("icon anh11")
      return imageImage;  // Biểu tượng ảnh cho các file ảnh

    }
    // Kiểm tra nếu là file Excel
    if (file.type === "excel") {
      return excelImage; // Biểu tượng cho file Excel
    }
    // Nếu không phải các loại đã định nghĩa, trả về file không được hỗ trợ
    return null;
  };

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
          src={getFileIcon()}  // Sử dụng hàm để lấy biểu tượng phù hợp
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