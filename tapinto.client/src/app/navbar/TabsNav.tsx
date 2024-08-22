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


export default function TabsNav() {
  const location = useLocation(); //use location.pathname to get current path
  const { mode, setMode } = useColorScheme();

  const getSelectedValue = () => {
    const lpn = location.pathname;
    let value = 0;
    if (lpn.includes("posts")) value = 0;
    else if (lpn.includes("groups")) value = 1;
    else if (lpn.includes("tests")) value = 2;
    else if (lpn.includes("results")) value = 3;
    return value;
  };

  return (
    <>
      {location.pathname.includes("home") && (
        <Grid container>
          <Grid xs={12}>
            <Tabs defaultValue={0} value={(() => getSelectedValue())()}>
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
                <Tab
                  onClick={() => window.alert("test")}
                  component={NavLink}
                  to={"/home/groups"}
                  title={"Groups"}
                >
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
