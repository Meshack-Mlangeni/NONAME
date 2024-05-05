import {
  DarkModeTwoTone,
  Diversity2Rounded,
  LightModeTwoTone,
} from "@mui/icons-material";
import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "../../features/components/Separator";
import handleTheme from "../../helpers/handleTheme";
import '../../App.css';
import { Chip, Avatar } from "@mui/material";
import { handleNavBar } from "../../helpers/handleNavbar";


export default function NavigationBar() {
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
  }

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
              <Nav.Link as={NavLink} to="home" className={handleNavBar('/home')}>Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="settings" className={handleNavBar('/settings')}>
                Settings
              </Nav.Link>
              <Nav.Link as={NavLink} to="about" className={handleNavBar('/about')}>
                About
              </Nav.Link>
              <span className={Theme ? "text-danger" : "text-light"} style={{ fontSize:24 }} >
                |
              </span>
              <Nav.Link as={NavLink} to="account" className={handleNavBar('/account')}
                onClick={() => isFalseLogin()}
              >
                {(isLogged) ? "Login" : <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />}
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
                as={NavLink} to="/home/posts"
                eventKey="posts"
              >
                Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                as={NavLink} to="/home/groups"
                eventKey="groups"
              >
                Groups
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                as={NavLink} to="/home/tests"
                eventKey="tests"
              >
                Tests
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={Theme ? "text-dark" : "text-light"}
                as={NavLink} to="/home/results"
                eventKey="results"
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
