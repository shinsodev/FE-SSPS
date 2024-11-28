import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SelectComponent(props) {
  const { listSelect, label, value, onChange } = props;

  const [data, setData] = useState("");

  function handleSelect(e) {
    const value = e.target.value;
    setData(value);
  }

  return (
    <>
      {/* <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={data}
          onChange={handleSelect}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {listSelect.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}


      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value} // Giá trị được kiểm soát bởi prop `value`
          onChange={onChange} // Gọi callback `onChange` khi giá trị thay đổi
          input={<OutlinedInput label={label} />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 224,
                width: 250,
              },
            },
          }}
        >
          {listSelect.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </>
  );
}
export default SelectComponent;
