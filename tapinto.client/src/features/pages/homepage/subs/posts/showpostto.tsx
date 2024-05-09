import * as React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { AccountBalance, Diversity3, KeyboardArrowDown, Public } from "@mui/icons-material";

export default function ShowTo() {
  const [access, setAccess] = React.useState("Public");
  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setAccess(newValue!);
  };

  return (
    <Select
      variant="plain"
      value={access}
      defaultValue="Public"
      size="sm"
      onChange={handleChange}
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 100,
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      <Option value="Public">
        <Public />
        Public
      </Option>
      <Option value="Groups">
        <Diversity3/>
        Groups</Option>
      <Option value="School">
        <AccountBalance/>
        School</Option>
    </Select>
  );
}
