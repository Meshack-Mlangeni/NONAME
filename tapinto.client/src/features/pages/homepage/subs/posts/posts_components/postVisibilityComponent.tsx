import * as React from "react";
import MenuButton from "@mui/joy/MenuButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";
import { useAppSelector } from "../../../../../../app/store/store";
import { Check, VisibilityRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

export default function ShowTo() {
  const { user } = useAppSelector((state) => state.account);
  const Tablet = useMediaQuery("(min-width:1100px)");
  const _showto: string[] | null = user && user?.groups.map((g) => g.groupName);
  user && _showto && _showto?.unshift(user?.school);
  const [group, setGroup] = React.useState(_showto![0] ?? "Public");

  return (
    <>
      <Dropdown>
        <MenuButton endDecorator={<ArrowDropDown />}>
          <VisibilityRounded /> &nbsp;{" "}
          {!Tablet ? group.substring(0, 6) + "..." : group}
        </MenuButton>
        <Menu size="sm" sx={{ "--ListItemDecorator-group": "10px" }}>
          <ListItem>
            <List>
              {_showto?.map((item, index) => (
                <>
                  <MenuItem
                    key={item + index.toString()}
                    role="menuitemradio"
                    aria-checked={item === group ? "true" : "false"}
                    onClick={() => {
                      setGroup(item);
                    }}
                  >
                    <ListItemDecorator>
                      {item === group && <Check color="primary" />}
                    </ListItemDecorator>{" "}
                    {item}
                  </MenuItem>
                  {index === 0 && <ListDivider />}
                </>
              ))}
            </List>
          </ListItem>
        </Menu>
      </Dropdown>
    </>
    // <Select
    //   variant="plain"
    //   value={access}
    //   defaultValue="Public"
    //   group="sm"
    //   onChange={handleChange}
    //   indicator={<KeyboardArrowDown />}
    //   sx={{
    //     width: 100,
    //     [`& .${selectClasses.indicator}`]: {
    //       transition: "0.2s",
    //       [`&.${selectClasses.expanded}`]: {
    //         transform: "rotate(-180deg)",
    //       },
    //     },
    //   }}
    // >
    //   <Option value="Public">
    //     <Public />
    //     Public
    //   </Option>
    //   <Option value="Groups">
    //     <Diversity3/>
    //     Groups</Option>
    //   <Option value="School">
    //     <AccountBalance/>
    //     School</Option>
    // </Select>
  );
}
