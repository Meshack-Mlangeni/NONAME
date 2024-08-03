import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavigationBar from "./app/navbar/NavigationBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CssBaseline, Grid, useColorScheme } from "@mui/joy";
import { useAppDispatch } from "./app/store/store";
import "./assets/fonts/AsahinaSans.ttf";
import { useCallback, useEffect } from "react";
import { setLoading } from "./app/store/appSlice";
import { fetchLoggedInUser } from "./features/pages/account/accountSlice";
import { routes } from "./app/router/Routes";
import {
  getallActivityAsync,
  getAllSchoolUserGroupsAsync,
  getLabelsAsync,
} from "./features/pages/homepage/subs/posts/postSlice";
import { getAllSchoolsAsync } from "./features/pages/homepage/subs/myschool/schoolSlice";

function App() {
  const appLocation = useLocation();
  const dispatch = useAppDispatch();
  const theme = useColorScheme();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchLoggedInUser())
        .then(() => {
          routes.navigate("/home/posts");
        })
        .finally(async () => {
          await dispatch(getLabelsAsync());
          await dispatch(getallActivityAsync());
          await dispatch(getAllSchoolUserGroupsAsync());
          await dispatch(getAllSchoolsAsync());
          dispatch(setLoading(false));
        });
    } catch (error) {
      routes.navigate("/login");
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme={theme.colorScheme == "dark" ? "dark" : "light"}
      />
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
