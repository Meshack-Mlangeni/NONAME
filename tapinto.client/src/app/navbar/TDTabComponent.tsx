/* eslint-disable @typescript-eslint/no-explicit-any */
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tab from "@mui/joy/Tab";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

interface ITBTC {
  val: number;
  index: number;
  MUIcon: any;
  name: string;
  to: string;
  show?: boolean;
}
export default function TBTabComponent({
  val,
  MUIcon,
  index,
  name,
  to,
  show = true,
}: ITBTC) {
  const user = useAppSelector((state) => state.account);
  return show ? (
    <Tab
      disableIndicator
      orientation="vertical"
      disabled={!user}
      component={NavLink}
      to={to}
      {...(index === val && { color: "primary" })}
    >
      <ListItemDecorator sx={{ mb: "1px" }}>
        {MUIcon}
        &nbsp;{name}
      </ListItemDecorator>
    </Tab>
  ) : (
    <></>
  );
}
