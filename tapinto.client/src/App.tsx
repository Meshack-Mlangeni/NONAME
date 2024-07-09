import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavigationBar from "./app/navbar/NavigationBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CssBaseline, Grid, LinearProgress } from "@mui/joy";
import { useAppDispatch, useAppSelector } from "./app/store/store";
import "./assets/fonts/AsahinaSans.ttf";
import { useCallback, useEffect } from "react";
import { setLoading } from "./app/store/appSlice";
import { fetchLoggedInUser } from "./features/pages/account/accountSlice";

function App() {
  const appLocation = useLocation();
  const { Loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchLoggedInUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  return (
    <>
      {Loading && (
        <LinearProgress variant="plain" determinate={false} thickness={5} />
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
