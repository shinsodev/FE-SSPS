import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState, useRef } from 'react';
import FileComp from "../Printer/FileComponent";
import FileConfigurationPage from "../Printer/FileConfiguration";

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
function UploadFilePage(props) {
  const {idPrinter} = props
  const [file, setFile] = useState(null);
  const [selectPrinter, setSelectPrinter] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  //const navigate = useNavigate();
  const fileInputRef = useRef(null); 


  function handleSelectPrinter(e) {//dùng để lấy id máy in , sau này thêm vào
    setSelectPrinter({ id: idPrinter });
    //navigate("/uploadFile/fileConfigurationPage");
  }

  const handleUploadFile = (e) => {
    const fileData = e.target.files[0];
    if (!fileData) return;
    console.log(fileData)
    if (fileData.type === "application/pdf") {
      setFile({ type: "pdf", name: fileData.name }); // Lưu toàn bộ file
    } else if (
      fileData.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFile({ type: "docx", name: fileData.name }); // Lưu toàn bộ file
    }
    else if (fileData.type.startsWith("image/")) {
      // Kiểm tra nếu là file ảnh
      setFile({ type: "image", name: fileData.name }); // Lưu toàn bộ file ảnh
    }else if (
      fileData.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      // fileData.type === "application/vnd.ms-excel"
    ) {
      // Kiểm tra nếu là file Excel (xlsx )
      setFile({ type: "excel", name: fileData.name }); // Lưu toàn bộ file Excel
    }
    else{
      alert("File tải lên không được hỗ trợ.")
    }
    setFileContent(fileData)
    e.target.value = ""; // Reset giá trị của input file
  };//file lưu file tải lên


  function handleCancel(e) {
    setFile(null); // Reset state file

    // Kiểm tra và reset giá trị input file nếu tồn tại
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function deleteFile(){
    setFile(null);
    setFileContent(null);
    setSelectPrinter(null);
  }
  

  return (
    <>
      {selectPrinter === null && (
        <div className="min-h-screen">
          <Stack spacing={3} alignItems={"center"} mt={5}>
            <Typography variant="h3" textAlign={"center"}>
              HỆ THỐNG IN THÔNG MINH
            </Typography>
            <Typography variant="h5">Chọn file để in</Typography>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Tải lên
              <VisuallyHiddenInput id="fileInput" type="file" onChange={handleUploadFile} />

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
                      Hủy
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <Button variant="contained" color="success" size="large"
                      onClick={handleSelectPrinter}
                    >
                      Cấu hình in
                    </Button>
                  </Grid2>
                </Grid2>
              </Stack>
            )}
          </Stack>
        </div>)}
      {selectPrinter !== null && (
        <>
          <FileConfigurationPage printerId={selectPrinter.id} uploadedFile={fileContent} deleteFile={deleteFile} />
        </>
      )}

    </>
  );
}
export default UploadFilePage;
