import * as React from "react";
import Box from "@mui/joy/Box";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import { tabClasses } from "@mui/joy/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Person from "@mui/icons-material/Person";
import {
  AccountBoxOutlined,
  AdminPanelSettings,
  AppRegistration,
  Key,
  Login,
  Logout,
  SchoolRounded,
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
import { NavLink, useLocation } from "react-router-dom";
import TabsNav from "./TabsNav";
import NavSpacingComponent from "./NavSpacingComponent";
import AppLogo from "./AppLogo";
import { useAppDispatch, useAppSelector } from "../store/store";
import { signUserOutAsync } from "../../features/pages/account/accountSlice";
import TBTabComponent from "./TDTabComponent";

export default function TabDesktopNavBar() {
  const location = useLocation();
  const getInitIndex = () => {
    if (location.pathname.includes("home")) return 0;
    else if (location.pathname.includes("myschool")) return 1;
    else if (location.pathname.includes("settings")) return 2;
    else if (location.pathname.includes("profile")) return 3;
    else if (location.pathname.includes("adminhome")) return 4;
    else return 0;
  };

  const [index, setIndex] = React.useState(getInitIndex());

  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

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
                <TBTabComponent
                  name="Home"
                  MUIcon={<HomeRoundedIcon />}
                  val={0}
                  index={index}
                  to={"/home/activity"}
                />

                <TBTabComponent
                  name="School"
                  MUIcon={<SchoolRounded />}
                  val={1}
                  index={index}
                  to={"/myschool"}
                />

                <TBTabComponent
                  name="Settings"
                  MUIcon={<Settings />}
                  val={2}
                  index={index}
                  to={"/settings"}
                />

                <TBTabComponent
                  name="Profile"
                  MUIcon={<Person />}
                  val={3}
                  index={index}
                  to={"/mobprofile"}
                />

                <TBTabComponent
                  show={user?.roles.includes("Admin")}
                  name="Admin"
                  MUIcon={<AdminPanelSettings />}
                  val={4}
                  index={index}
                  to={"/adminhome"}
                />
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
                      to="/login"
                      onClick={() => dispatch(signUserOutAsync())}
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
