import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavigationBar from "./app/navbar/NavigationBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CssBaseline, Grid, LinearProgress } from "@mui/joy";
import { useAppSelector } from "./app/store/store";
import "./assets/fonts/AsahinaSans.ttf";

function App() {
  const appLocation = useLocation();
  const { Loading } = useAppSelector((state) => state.app);
  return (
    <>
      {Loading && (
        <LinearProgress variant="plain" determinate={false} thickness={2} />
      )}
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {!appLocation.pathname.toLocaleLowerCase().includes("login") &&
      !appLocation.pathname.toLocaleLowerCase().includes("register") ? (
        <>
          <NavigationBar />
          <Grid container sx={{ flexGrow: 1 }}>
            <Grid xs={12}>
              <Outlet />
            </Grid>
          </Grid>
        </>
      ) : (
        <Outlet />
      )}
      <CssBaseline />
    </>
  );
}

export default App;
