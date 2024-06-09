import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavigationBar from "./app/navbar/NavigationBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Sheet } from "@mui/joy";

function App() {
  const appLocation = useLocation();
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {!appLocation.pathname.toLocaleLowerCase().includes("login") &&
        !appLocation.pathname.toLocaleLowerCase().includes("register") ?
       (<Sheet  sx={{height: "100dvh"}}>
          <NavigationBar />
          <Container>
            <Outlet />
          </Container>
        </Sheet>) : (<Outlet />)}
    </>
  );
}

export default App;
