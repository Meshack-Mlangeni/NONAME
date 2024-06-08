import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import {
  Sheet,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  Grid,
} from "@mui/joy";
import { useAppSelector } from "../store/store";

export default function NavigationBar() {
  const { numberOfPosts } = useAppSelector((state) => state.posts);
  const navigate = useNavigate(); // to navigate using routers
  const location = useLocation(); //use location.pathname to get current path

  return (
    <>
      <Sheet
        variant="solid"
        invertedColors
        color="primary"
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          p: 2,
          background: `linear-gradient(to top, #FF00FF, #00FF000)`,
        }}
      >
      </Sheet>

      {location.pathname.includes("home") && (
        <Grid container spacing={2} sx={{ flexGrow: 1}}>
          <Grid xs={12}>
            <Tabs aria-label="Basic tabs" defaultValue={0}>
              <TabList>
                <Tab title={"Posts"}>Posts</Tab>
                <Tab title={"My School"}>My School</Tab>
                <Tab title={"Tests"}>Tests</Tab>
                <Tab title={"Results"}>Results</Tab>
              </TabList>
              <TabPanel value={0}>
                <b>First</b> tab panel
              </TabPanel>
              <TabPanel value={1}>
                <b>Second</b> tab panel
              </TabPanel>
              <TabPanel value={2}>
                <b>Third</b> tab panel
              </TabPanel>
              <TabPanel value={3}>
                <b>Third</b> tab panel
              </TabPanel>
            </Tabs>
          </Grid>
        </Grid>
      )}
    </>
  );
}
