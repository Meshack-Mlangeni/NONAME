import {
  DarkModeTwoTone,
  Diversity2Rounded,
  HomeRounded,
  InfoRounded,
  KeyRounded,
  LightModeTwoTone,
  SettingsRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "../../features/components/Separator";
import handleTheme from "../../helpers/handleTheme";
import "../../App.css";
import { handleNavBar } from "../../helpers/handleNavbar";
import { Badge, Tooltip } from "@mui/joy";
import { useAppSelector } from "../store/store";
import { ToastContainer } from "react-toastify";

export default function NavigationBar() {
  const { numberOfPosts } = useAppSelector((state) => state.posts);

  const navigate = useNavigate(); // to navigate using routers
  const location = useLocation(); //use location.pathname to get current path
  const [Theme, setTheme] = useState<boolean>(true);

  
  const [isLogged, setLogged] = useState<boolean>(true);
  const changeTheme = () => {
    setTheme(!Theme);
    handleTheme(Theme, 500);
  };
  const isFalseLogin = () => {
    setLogged(!isLogged);
  };
  // const theme = createTheme({
  //   palette: {
  //     mode: 'light',
  //     background: {
  //       default: Theme ? "#121212" : "#eaeaea",
  //     },
  //   },
  // });

  return (
    <>
      <div className="px-3 py-2 text-bg-dark">
        <Container>
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              className="animated d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              onClick={() => navigate("/home")}
            >
              <Diversity2Rounded className="bi d-block mx-auto mb-1 me-3" />
              <span
                style={{ fontSize: "20px", position: "relative", top: "-2px" }}
                className="text-light fw-bold"
              >
                This Needs a Name 2
              </span>
            </a>
            <Nav className="col-12 col-lg-auto my-2 justify-content-center my-md-0 fw-bold">
              <Nav.Link
                as={NavLink}
                to="home"
                className={handleNavBar("/home")}
              >
                <Tooltip
                  title="Home"
                  arrow
                  color="neutral"
                  placement="bottom"
                  variant="solid"
                >
                  <HomeRounded />
                </Tooltip>
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="settings"
                className={handleNavBar("/settings")}
              >
                <Tooltip
                  title="Settings"
                  arrow
                  color="neutral"
                  placement="bottom"
                  variant="solid"
                >
                  <SettingsRounded />
                </Tooltip>
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="about"
                className={handleNavBar("/about")}
              >
                <Tooltip
                  title="About Us"
                  arrow
                  color="neutral"
                  placement="bottom"
                  variant="solid"
                >
                  <InfoRounded />
                </Tooltip>
              </Nav.Link>
              <span className="text-primary" style={{ fontSize: 24 }}>
                |
              </span>
              <Nav.Link
                as={NavLink}
                to="account"
                className={handleNavBar("/account")}
                onClick={() => isFalseLogin()}
              >
                <Tooltip
                  title="Login/Register"
                  arrow
                  color="neutral"
                  placement="bottom"
                  variant="solid"
                >
                  <KeyRounded />
                </Tooltip>
              </Nav.Link>
            </Nav>
            <br />
          </div>
        </Container>
      </div>

      {location.pathname.includes("home") && (
        <Container className="mb-3">
          <Nav variant="underline" defaultActiveKey="posts">
            <Nav.Link
              className={Theme ? "text-dark" : "text-light"}
              onClick={changeTheme}
            >
              {Theme ? (
                <>
                  <DarkModeTwoTone />
                </>
              ) : (
                <>
                  <LightModeTwoTone />
                </>
              )}
            </Nav.Link>
            <Separator />
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                as={NavLink}
                to="/home/posts"
                eventKey="posts"
              >
                <Badge
                  invisible={!numberOfPosts}
                  showZero={false}
                  size="sm"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  Posts
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                as={NavLink}
                to="/home/groups"
                eventKey="groups"
              >
                <Badge
                  invisible={true}
                  showZero={false}
                  size="sm"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  Groups
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                as={NavLink}
                to="/home/tests"
                eventKey="tests"
              >
                <Badge
                  invisible={true}
                  showZero={false}
                  size="sm"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  Tests
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                as={NavLink}
                to="/home/results"
                eventKey="results"
              >
                <Badge
                  invisible={true}
                  showZero={false}
                  size="sm"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  Results
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      )}

      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <Container>
          <Outlet />
        </Container>
    </>
  );
}
