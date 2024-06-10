import { NavLink, useLocation } from "react-router-dom";
import "../../App.css";
import {
  Tab,
  Tabs,
  TabList,
  Grid,
  Switch,
  useColorScheme,
  Divider,
} from "@mui/joy";
import MobileNavBar from "./MobileNavBar";
import { useMediaQuery } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import TabDesktopNavBar from "./TabDesktopNavBar";

export default function NavigationBar() {
  const location = useLocation(); //use location.pathname to get current path
  const Tablet_Desktops = useMediaQuery("(min-width:600px)");
  const { mode, setMode } = useColorScheme();

  return (
    <>
      {Tablet_Desktops ? <TabDesktopNavBar /> : <MobileNavBar />}
      {location.pathname.includes("home") && (
        <Grid container>
          <Grid xs={12}>
            <Tabs defaultValue={0}>
              <TabList>
                <Switch
                  size="lg"
                  onChange={() => setMode(mode === "light" ? "dark" : "light")}
                  slotProps={{
                    input: { "aria-label": "Dark mode" },
                    thumb: {
                      children: mode === "light" ? <LightMode /> : <DarkMode />,
                    },
                  }}
                  sx={{
                    ml: 2,
                    mr: 2,
                    "--Switch-thumbSize": "16px",
                  }}
                />
                <Divider />
                <Tab component={NavLink} to={"/home/posts"} title={"Posts"}>
                  Posts
                </Tab>
                <Tab
                  component={NavLink}
                  to={"/home/myschool"}
                  title={"My School"}
                >
                  My School
                </Tab>
                <Tab component={NavLink} to={"/home/tests"} title={"Tests"}>
                  Tests
                </Tab>
                <Tab component={NavLink} to={"/home/results"} title={"Results"}>
                  Results
                </Tab>
              </TabList>
            </Tabs>
          </Grid>
        </Grid>
      )}
    </>
  );
}
