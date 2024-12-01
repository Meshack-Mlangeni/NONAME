import * as React from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Person from "@mui/icons-material/Person";
import { SchoolRounded, Settings } from "@mui/icons-material";
import TabsNav from "./TabsNav";
import NavSpacingComponent from "./NavSpacingComponent";
import AppLogo from "./AppLogo";
import { Typography } from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";

export default function MobileNavBar() {
  const location = useLocation();
  const getInitIndex = () => {
    if (location.pathname.includes("home")) return 0;
    else if (location.pathname.includes("myschool")) return 1;
    else if (location.pathname.includes("settings")) return 2;
    else if (location.pathname.includes("profile")) return 3;
    else return 0;
  };

  const [index, setIndex] = React.useState(getInitIndex());
  const colors = ["primary", "danger", "success", "warning"] as const;
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 32,
          right: 0,
        }}
      >
        <Tabs
          size="sm"
          aria-label="Bottom Navigation"
          value={getInitIndex()}
          onChange={(_, value) => {
            setIndex(value as number);
            if (value === 0) navigate("/home/activity");
            else if (value === 1) navigate("/myschool");
            else if (value === 2) navigate("/settings");
            else navigate("/mobprofile");
          }}
          sx={(theme) => ({
            p: 1,
            pb: 2,
            maxWidth: "100%",
            mx: "auto",
            "--joy-shadowChannel":
              theme.vars.palette[colors[index]].darkChannel,
            [`& .${tabClasses.root}`]: {
              py: 1,
              flex: 1,
              transition: "0.3s",
              fontWeight: "md",
              fontSize: "md",
              [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                opacity: 0.7,
              },
            },
          })}
        >
          <Typography sx={{ textAlign: "center", mb: 0.5, mt: 0.5 }}>
            <AppLogo />
          </Typography>
          <TabList
            variant="plain"
            size="sm"
            disableUnderline
            sx={{ borderRadius: "lg", p: 0 }}
          >
            <Tab
              disableIndicator
              orientation="vertical"
              {...(index === 0 && { color: "primary" })}
            >
              <ListItemDecorator sx={{ mb: "1px" }}>
                <HomeRoundedIcon />
                &nbsp;Home
              </ListItemDecorator>
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              {...(index === 1 && { color: "primary" })}
            >
              <ListItemDecorator sx={{ mb: "1px" }}>
                <SchoolRounded />
                &nbsp;School
              </ListItemDecorator>
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              {...(index === 2 && { color: "primary" })}
            >
              <ListItemDecorator sx={{ mb: "1px" }}>
                <Settings />
                &nbsp;Settings
              </ListItemDecorator>
            </Tab>
            <Tab
              disableIndicator
              orientation="vertical"
              {...(index === 3 && { color: "primary" })}
            >
              <ListItemDecorator sx={{ mb: "1px" }}>
                <Person />
                &nbsp;Profile
              </ListItemDecorator>
            </Tab>
          </TabList>
        </Tabs>
        <TabsNav />
      </Box>
      <NavSpacingComponent spacing={{ pb: 10, pt: 2 }} />
    </>
  );
}
