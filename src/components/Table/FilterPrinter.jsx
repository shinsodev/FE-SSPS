import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Button } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function FilterPrinter(props) {
  const { setFilterType } = props;
  const [filterValues, setFilterValues] = React.useState([]);

  function handleChange(e, value) {
    setFilterValues(value);
  }

  async function handleClick(e) {
    // console.log("Filter values: ", filterValues);
    try {
      await setFilterType(filterValues);
    } catch (err) {
      console.log(er);
    }
  }
  return (
    <>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          size="small"
          options={availableTypes}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          onChange={handleChange}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </li>
            );
          }}
          style={{ width: 420 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter type"
              sx={{ backgroundColor: "white" }}
            />
          )}
        />

        <Button
          onClick={handleClick}
          sx={{ ml: 2 }}
          variant="contained"
          size="small"
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

// Available Type and name
const availableTypes = [
  { value: "application/pdf", title: "pdf" },
  {
    value: "pplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    title: "excel",
  },
  { value: "image/tiff", title: "TIFF" },
  { value: "image/jpeg", title: "jpeg" },
  { value: "image/gif", title: "gif" },
];
