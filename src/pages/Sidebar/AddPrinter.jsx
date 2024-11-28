import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { addPrinter } from "../../services/AdminService";
import { notifySuccess } from "../../components/Notification/NotifySuccess";
import { notifyError } from "../../components/Notification/NotifyError";
import { useNavigate } from "react-router-dom";

const listType = [
  { value: "application/pdf", name: "pdf" },
  {
    value: "pplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    name: "excel",
  },
  { value: "image/tiff", name: "TIFF" },
  { value: "image/jpeg", name: "jpeg" },
  { value: "image/gif", name: "gif" },
];

function AddPrinter() {
  const [dataPrinter, setDataPrinter] = useState({
    printerLocation: "",
    status: "",
    papersLeft: 0,
    availableDocType: [],
  });
  const [listTypeSelect, setListTypeSelect] = useState([]);
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "availableDocType") {
      const data = typeof value === "string" ? value.split(",") : value;
      setListTypeSelect(data);
      const newData = [];
      data.map((item) => {
        let res = "";
        switch (item) {
          case "pdf":
            res = "application/pdf";
            break;
          case "excel":
            res =
              "pplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            break;
          case "TIFF":
            res = "image/tiff";
            break;
          case "gif":
            res = "image/gif";
            break;
          case "jpeg":
            res = "image/jpeg";
            break;
        }
        newData.push(res);
      });
      setDataPrinter((prev) => ({
        ...prev,
        [name]: newData,
      }));
    } else if (name === "papersLeft") {
      let valNum = Math.floor(value);
      setDataPrinter((prev) => ({
        ...prev,
        [name]: valNum,
      }));
    } else {
      setDataPrinter((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  // check data is valid
  function checkData() {
    if (
      dataPrinter.printerLocation === "" ||
      dataPrinter.status === "" ||
      dataPrinter.availableDocType.length === 0
    ) {
      return { success: false, error: "Missing data" };
    }
    return { success: true };
  }

  async function handleSubmit() {
    // Check data if is valid
    const handleData = checkData();
    if (!handleData.success) {
      notifyError(handleData.error);
      return;
    }

    // get token
    const token = localStorage.getItem("token");
    if (!token) {
      notifyError("Token not found.");
      return;
    }

    // Process call api to add printer
    try {
      console.log(dataPrinter);
      const result = await addPrinter(token, dataPrinter);
      if (result.success) {
        notifySuccess("Add printer success");
        navigate("/admin/printerlist");
      } else {
        throw result.error;
      }
    } catch (err) {
      notifyError("Add printer failed, error: ", err.message);
    }
  }

  return (
    <div className="p-8 rounded-lg bg-white w-full mx-auto max-w-2xl border-none outline-none">
      <h2 className="h3 text-[40px] text-primary text-center pb-6 pt-6">
        ADD PRINTER
      </h2>
      {/* Location */}
      <Typography mb={1} ml={1}>
        Location:
      </Typography>
      <FormControl
        sx={{
          m: 1,
          width: 500,
        }}
        size="small"
      >
        {/* Location */}
        <InputLabel id="demo-multiple-name-label">Location</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={dataPrinter.printerLocation}
          onChange={handleChange}
          input={<OutlinedInput label="Location" />}
          name="printerLocation"
        >
          <MenuItem value={"H1-202"}>H1-202</MenuItem>
          <MenuItem value={"H6-601"}>H6-601</MenuItem>
        </Select>
      </FormControl>
      {/* Status */}
      <Typography mb={1} ml={1}>
        Status:
      </Typography>
      <FormControl sx={{ m: 1, width: 500 }} size="small">
        {/* Location */}
        <InputLabel id="demo-multiple-name-label">Status</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={dataPrinter.status}
          onChange={handleChange}
          input={<OutlinedInput label="Status" />}
          name="status"
          size="small"
        >
          <MenuItem value={"ONLINE"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "100%", // Đảm bảo chiều cao bằng với Select
              }}
            >
              <CircleIcon sx={{ color: "green", width: "20px", p: 0 }} /> ONLINE
            </Box>
          </MenuItem>
          <MenuItem value={"OFFLINE"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "100%",
              }}
            >
              <CircleIcon sx={{ color: "red", width: "20px", p: 0 }} /> OFFLINE
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
      {/* Paper left */}
      <Typography mb={1} ml={1}>
        Papers:
      </Typography>
      <TextField
        size="small"
        sx={{ m: 1, width: 500 }}
        type="number"
        value={dataPrinter.papersLeft}
        onChange={handleChange}
        name="papersLeft"
        inputProps={{
          min: 0,
          step: 1,
        }}
      />
      {/* Available doc type */}
      <Typography mb={1} ml={1}>
        Doc type:
      </Typography>
      <FormControl sx={{ m: 1, width: 500 }} size="small">
        {/* Location */}
        <InputLabel id="demo-multiple-name-label">Doc type</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={listTypeSelect}
          onChange={handleChange}
          input={<OutlinedInput label="Doc type" />}
          name="availableDocType"
          size="small"
          renderValue={(selected) => selected.join(", ")}
          multiple
        >
          {listType.map((item) => (
            <MenuItem value={item.name} key={item.name}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  height: "100%", // Đảm bảo chiều cao bằng với Select
                }}
              >
                {item.name}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", width: 500, m: 1 }}
      >
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default AddPrinter;
