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

export default function MobileNavBar() {
  const [index, setIndex] = React.useState(0);
  const colors = ["primary", "danger", "success", "warning"] as const;

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
          value={index}
          onChange={(_, value) => setIndex(value as number)}
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
