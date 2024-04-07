import { DarkModeTwoTone, Diversity1TwoTone, Diversity2Rounded, HomeRounded, InfoTwoTone, KeyTwoTone, LightModeTwoTone } from "@mui/icons-material";
import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Separator } from "../../features/components/Separator";

export default function NavigationBar() {
    const navigate = useNavigate(); // to navigate using routers
    const location = useLocation(); //use location.pathname to get current path
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    return (
        <>
            <div className="px-3 py-2 text-bg-dark">
                <Container>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                            <Diversity2Rounded className="bi d-block mx-auto mb-1 me-3" />
                            <span style={{ fontSize: '20px', position: 'relative', top: '-2px' }} className="text-light fw-bold">NONAMED</span>
                        </a>
                        <Nav className="col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <Nav.Link className="text-secondary">
                                <HomeRounded className="bi d-block mx-auto mb-1" /> Home
                            </Nav.Link>
                            <Nav.Link className="text-white">
                                <Diversity1TwoTone className="bi d-block mx-auto mb-1" />
                                Link 1
                            </Nav.Link>
                            <Nav.Link className="text-white">
                                <InfoTwoTone className=" bi d-block mx-auto mb-1" />
                                About us
                            </Nav.Link>
                            <span style={{ color: '#313131' }} className="display-6">|</span>
                            <Nav.Link className="text-white">
                                <KeyTwoTone className=" bi d-block mx-auto mb-1" />
                                Login
                            </Nav.Link>
                        </Nav>
                        <br />
                    </div>
                </Container>
            </div>
            <Container className="mb-3">
                <Nav variant="underline" activeKey="link-1" defaultActiveKey="/home">
                    <Nav.Link className="text-dark" onClick={() => setDarkTheme(!darkTheme)}>
                        {darkTheme ? <>< DarkModeTwoTone /></> : <>< LightModeTwoTone  /></>}
                    </Nav.Link>
                    <Separator/>
                    <Nav.Item>
                        <Nav.Link className="text-dark" href="/home">Posts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="text-dark" eventKey="link-1">Groups</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="text-dark" eventKey="disabled">Tests</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="text-dark" eventKey="disabled">Results</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </>
    )
}