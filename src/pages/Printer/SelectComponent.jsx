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
  const { listSelect, label } = props;

  const [data, setData] = useState("");

  function handleSelect(e) {
    const value = e.target.value;
    setData(value);
  }

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
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
      </FormControl>
    </>
  );
}
export default SelectComponent;
