import * as React from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import {
  AccountBoxOutlined,
  AppRegistration,
  Key,
  Login,
  Logout,
  Settings,
} from "@mui/icons-material";
import {
  Sheet,
  Typography,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { NavLink } from "react-router-dom";
import TabsNav from "./TabsNav";
import NavSpacingComponent from "./NavSpacingComponent";
import AppLogo from "./AppLogo";
import { useAppDispatch, useAppSelector } from "../store/store";
import { signOutUser } from "../../features/pages/account/accountSlice";

export default function TabDesktopNavBar() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [index, setIndex] = React.useState(0);
  return (
    <>
      <Sheet
        invertedColors
        color="primary"
        sx={{
          position: "fixed",
          zIndex: 32,
          height: 60,
          width: "100%",
          background: `linear-gradient(to top, #FF00FF, #00FF000)`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            pl: 2,
            pr: 2,
          }}
        >
          <AppLogo />

          <Box
            color="primary"
            sx={{
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <Tabs
              size="sm"
              color="primary"
              value={index}
              onChange={(_, value) => setIndex(value as number)}
              sx={{
                p: 1,

                maxWidth: "100%",
                mx: "auto",

                [`& .${tabClasses.root}`]: {
                  py: 1,
                  flex: 1,
                  transition: "0.3s",
                  fontWeight: "lg",
                  fontSize: "md",
                  [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                    opacity: 0.8,
                  },
                },
              }}
            >
              <TabList
                size="sm"
                disableUnderline
                sx={{ borderRadius: "lg", p: 0 }}
              >
                <Tab
                  disableIndicator
                  orientation="vertical"
                  component={NavLink}
                  to={"/home"}
                  {...(index === 0 && { color: "primary" })}
                >
                  <ListItemDecorator sx={{ mb: "1px" }}>
                    <HomeRoundedIcon />
                    &nbsp;Home
                  </ListItemDecorator>
                </Tab>
                <Tab
                  disableIndicator
                  orientation="vertical"
                  component={NavLink}
                  to={"/home/myschool/groups"} //not yet available
                  {...(index === 1 && { color: "primary" })}
                >
                  <ListItemDecorator sx={{ mb: "1px" }}>
                    <Search />
                    &nbsp;Groups
                  </ListItemDecorator>
                </Tab>
                <Tab
                  disableIndicator
                  orientation="vertical"
                  component={NavLink}
                  to={"/settings"}
                  {...(index === 2 && { color: "primary" })}
                >
                  <ListItemDecorator sx={{ mb: "1px" }}>
                    <Settings />
                    &nbsp;Settings
                  </ListItemDecorator>
                </Tab>
                <Tab
                  disableIndicator
                  orientation="vertical"
                  component={NavLink}
                  to={"/home/profile"}
                  {...(index === 3 && { color: "primary" })}
                >
                  <ListItemDecorator sx={{ mb: "1px" }}>
                    <Person />
                    &nbsp;Profile
                  </ListItemDecorator>
                </Tab>
              </TabList>
            </Tabs>
          </Box>

          <Typography component="div" sx={{ flexGrow: 1 }} />
          <Box>
            {!user ? (
              <Dropdown>
                <MenuButton
                  startDecorator={<Key />}
                  color="primary"
                  variant="solid"
                >
                  Account
                </MenuButton>
                <Menu>
                  <MenuItem component={NavLink} to="/login">
                    <Login />
                    Login
                  </MenuItem>
                  <MenuItem component={NavLink} to="/register">
                    <AppRegistration />
                    Register
                  </MenuItem>
                </Menu>
              </Dropdown>
            ) : (
              <>
                <Dropdown>
                  <MenuButton color="primary" variant="solid">
                    Hello, {user.firstName}
                  </MenuButton>
                  <Menu>
                    <MenuItem component={NavLink} to="/login">
                      <AccountBoxOutlined />
                      Account
                    </MenuItem>
                    <MenuItem
                      component={NavLink}
                      to="/register"
                      onClick={() => dispatch(signOutUser())}
                    >
                      <Logout />
                      Logout
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </>
            )}
          </Box>
        </Box>
        <TabsNav />
      </Sheet>
      <NavSpacingComponent />
    </>
  );
}
