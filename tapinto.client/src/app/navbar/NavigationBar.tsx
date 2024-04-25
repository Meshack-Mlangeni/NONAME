import {
  DarkModeTwoTone,
  Diversity2Rounded,
  HomeRounded,
  InfoRounded,
  KeyTwoTone,
  LightModeTwoTone,
  SettingsRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "../../features/components/Separator";
import handleTheme from "../../helpers/handleTheme";
import handleNavBar from "../../helpers/handleNavbar";
import '../../App.css';


export default function NavigationBar() {
  const navigate = useNavigate(); // to navigate using routers
  const location = useLocation(); //use location.pathname to get current path
  const [Theme, setTheme] = useState<boolean>(true);
  const changeTheme = () => {
    setTheme(!Theme);
    handleTheme(Theme, 500);
  };


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
            <Nav style={{fontSize: '10px'}} className="col-12 col-lg-auto my-2 justify-content-center my-md-0 fw-bold">
              <Nav.Link as={NavLink} to="home" className={handleNavBar('/home')}>
                <HomeRounded className="bi d-block mx-auto mb-1" /> Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="settings" className={handleNavBar('/settings')}>
                <SettingsRounded className="bi d-block mx-auto mb-1" />
                Settings
              </Nav.Link>
              <Nav.Link as={NavLink} to="about" className={handleNavBar('/about')}>
                <InfoRounded className=" bi d-block mx-auto mb-1" />
                About
              </Nav.Link>
              <span style={{ color: "#313131" }} className="display-6">
                |
              </span>
              <Nav.Link as={NavLink} to="account" className={handleNavBar('/account')}>
                <KeyTwoTone className=" bi d-block mx-auto mb-1" />
                Login
              </Nav.Link>
            </Nav>
            <br />
          </div>
        </Container>
      </div>

      {location.pathname === "/home" && (
        <Container className="mb-3">
          <Nav variant="underline" activeKey="link-1" defaultActiveKey="/home">
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
                href="/home"
              >
                Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                eventKey="link-1"
              >
                Groups
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                eventKey="disabled"
              >
                Tests
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                eventKey="disabled"
              >
                Results
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      )}
    </>
  );
}
