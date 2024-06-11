import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavigationBar from "./app/navbar/NavigationBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CssBaseline, Grid, LinearProgress, Sheet } from "@mui/joy";
import { useAppSelector } from "./app/store/store";

function App() {
  const appLocation = useLocation();
  const { Loading } = useAppSelector(state => state.app);
  return (
    <Sheet sx={ (theme) => ({height: "100%",  background: theme.palette.mode === "dark" ? "#171717" : "#F0F0F0"})} >
       {Loading && <LinearProgress variant="plain" determinate={false} thickness={2}/>}
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
