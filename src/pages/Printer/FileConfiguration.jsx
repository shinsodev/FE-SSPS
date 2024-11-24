import { useTheme } from "@emotion/react";
import { Button, Grid2, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectComponent from "./SelectComponent";
import { notifySuccess } from "../../components/Notification/NotifySuccess";
import { TextField, Box } from "@mui/material";
import { uploadFile } from "../../services/UserService";
const listSelect = ["A1", "A2", "A3", "A4"];
const listSelect1 = ["1 mặt", "2 mặt"];
const listSelect2 = ["Có", "Không"];

function FileConfigurationPage({ printerId, uploadedFile }) {
  const [copies, setCopies] = useState(1);
  const [size, setSize] = useState("A1"); // Kích thước mặc định
  const [printType, setPrintType] = useState("1 mặt"); // Loại in mặc định
  const [color, setColor] = useState("Không"); // Màu in mặc định
  // const { userId, fileId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  function handleCancel() {
    if (location.pathname === "/uploadFile") {
      // Nếu hiện tại ở trang uploadFile, chuyển sang trang printer
      navigate("/printers");
    } else {
      // Nếu không ở trang uploadFile, chuyển sang trang uploadFile
      navigate("/uploadFile");
    }
  }

  async function handleSubmit(
    uploadedFile,
    printerId,
    copies,
    size,
    printType,
    color
  ) {
    console.log(copies);
    console.log(size);
    console.log(printType);
    console.log(color);
    try {
      const uploadConfig = {
        printerId,
        paperSize: size,
        sidedType: printType === "1 mặt" ? "single" : "double",
        numberOfCopies: copies,
        colorPrint: color === "Có" ? true : false,
      };
      const response = await uploadFile(uploadedFile, uploadConfig);
      console.log("Response:", response);
      // if (response.status === 200) {
      //   const responseData = response.data; // Lấy dữ liệu trả về từ API
      //   const message = ` ${JSON.stringify(responseData)}`;

      //   notifySuccess(message); // Hiển thị thông báo với dữ liệu từ response
      //   navigate("/studentreport"); // Chuyển hướng sau khi thành công
      // }
      // if (response.status === 200) {
      //   const { result } = response.data;
      //   notifySuccess(` ${result}`);
      //   navigate("/studentreport");
      // }

      if (response.status === 200) {
        // có thể thêm các trường hợp response khác nếu có
        const { result } = response.data;

        notifySuccess(result); // Hiển thị thông báo

        if (
          result.includes(
            "Student's account doesn't have enough pages to print this document"
          )
        ) {
          navigate("/payment"); // Chuyển hướng đến trang thanh toán
        } else if (result.includes("not supported")) {
          navigate("/printers"); // Chuyển hướng đến trang tải tài liệu
        } else {
          navigate("/studentreport"); // Chuyển hướng đến trang báo cáo
        }
      } else {
        console.error("Lỗi cấu hình:", response.data);
      }
    } catch (error) {
      console.error("Error khi gọi API:", error);
    }
  }
  return (
    <>
      <Stack spacing={3} alignItems={"center"} mt={5}>
        <Typography variant="h3" textAlign={"center"} sx={{ color: "#6A88B9" }}>
          CẤU HÌNH FILE
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
              Kích thước:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent
                listSelect={listSelect} // Danh sách kích thước
                label={"Kích thước"}
                value={size} // Giá trị hiện tại
                onChange={(e) => setSize(e.target.value)} // Cập nhật trạng thái cho "Kích thước"
              />
            </Grid2>
          </Grid2>

          {/* Print type */}
          {console.log("thay doi ko123")}
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
              Số mặt:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent
                listSelect={listSelect1} // Danh sách số mặt
                label={"Số mặt"}
                value={printType} // Giá trị hiện tại
                onChange={(e) => setPrintType(e.target.value)} // Cập nhật trạng thái cho "Số mặt"
              />
            </Grid2>
          </Grid2>

          <Grid2 container width={"100%"} spacing={1}>
            {/* color */}
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{
                alignContent: "center",
                fontSize: 27,
                fontWeight: "bold",
                opacity: "90%",
              }}
            >
              In màu
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <SelectComponent
                listSelect={listSelect2} // Danh sách số mặt
                label={"In màu"}
                value={color} // Giá trị hiện tại
                onChange={(e) => setColor(e.target.value)} // Cập nhật trạng thái cho "Số mặt"
              />
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
              Số bản in:
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <TextField
                type="number"
                label="Số bản in"
                variant="outlined"
                fullWidth
                inputProps={{
                  min: 1,
                }}
                value={copies}
                onChange={(e) => setCopies(e.target.value)}
              />
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
                onClick={() =>
                  handleSubmit(
                    uploadedFile,
                    printerId,
                    copies,
                    size,
                    printType,
                    color
                  )
                }
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
