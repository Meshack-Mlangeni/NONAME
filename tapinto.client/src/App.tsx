import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavigationBar from "./app/navbar/NavigationBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CssBaseline, Grid, Sheet } from "@mui/joy";

function App() {
  const appLocation = useLocation();
  return (
    <Sheet sx={ (theme) => ({height: "100dvh",  background: theme.palette.mode === "dark" ? "#171717" : "#F0F0F0"})} >
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {!appLocation.pathname.toLocaleLowerCase().includes("login") &&
        !appLocation.pathname.toLocaleLowerCase().includes("register") ?
        (<>
          <NavigationBar />
          <Grid container sx={{ flexGrow: 1}}>
            <Grid xs={12}>
              <Outlet/>
            </Grid>
          </Grid>
        </>) : (<Outlet />)}
        <CssBaseline/>
    </Sheet>
  );
}

export default App;
