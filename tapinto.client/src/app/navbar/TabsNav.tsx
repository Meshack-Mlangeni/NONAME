import { DarkMode, LightMode, Lock } from "@mui/icons-material";
import {
  Divider,
  Grid,
  Switch,
  Tab,
  TabList,
  Tabs,
  useColorScheme,
} from "@mui/joy";
import { NavLink, useLocation } from "react-router-dom";
import PasswordModal from "../../helpers/helper_components/PasswordModal";
import React from "react";

export default function TabsNav() {
  const location = useLocation(); //use location.pathname to get current path
  const { mode, setMode } = useColorScheme();

  return (
    <>
      {location.pathname.includes("home") && (
        <Grid container>
          <Grid xs={12}>
            <Tabs defaultValue={0}>
              <TabList>
                <Switch
                  size="lg"
                  onChange={() => {
                    setMode(mode === "light" ? "dark" : "light");
                  }}
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
                <Tab component={NavLink} to={"/home/groups"} title={"Groups"}>
                  Groups
                </Tab>
                <Tab component={NavLink} to={"/home/tests"} title={"Tests"}>
                  Tests
                </Tab>

                <Tab title={"Results"}>
                  <a onClick={() => console.log("asd")}>
                    <Lock />
                    &nbsp; Results
                  </a>
                  <PasswordModal />
                </Tab>
              </TabList>
            </Tabs>
          </Grid>
        </Grid>
      )}
    </>
  );
}
