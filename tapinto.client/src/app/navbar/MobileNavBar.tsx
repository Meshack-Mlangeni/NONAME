import * as React from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { Settings } from "@mui/icons-material";

export default function MobileNavBar() {
  const [index, setIndex] = React.useState(0);
  const colors = ["primary", "danger", "success", "warning"] as const;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: 0,
        right: 0,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
      }}
    >
      <Tabs
        size="sm"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(_, value) => setIndex(value as number)}
        sx={(theme) => ({
          p: 1,
          borderRadius: 16,
          maxWidth: "90%",
          mx: "auto",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          "--joy-shadowChannel": theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: "0.3s",
            fontWeight: "sm",
            fontSize: "sm",
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.7,
            },
          },
        })}
      >
        <TabList
          variant="plain"
          size="sm"
          disableUnderline
          sx={{ borderRadius: "lg", p: 0 }}
        >
          <Tab disableIndicator orientation="vertical"
               {...(index === 0 && {color:"primary"})}>
            <ListItemDecorator sx={{ mb: "1px" }}>
              <HomeRoundedIcon />
              &nbsp;Home
            </ListItemDecorator>
          </Tab>
          <Tab disableIndicator orientation="vertical" 
               {...(index === 1 && {color:"primary"})}>
            <ListItemDecorator sx={{ mb: "1px" }}>
              <Search />
              &nbsp;Groups
            </ListItemDecorator>
          </Tab>
          <Tab disableIndicator orientation="vertical"
               {...(index === 2 && {color:"primary"})}>
            <ListItemDecorator sx={{ mb: "1px"}}>
              <Settings />
              &nbsp;Settings
            </ListItemDecorator>
          </Tab>
          <Tab disableIndicator orientation="vertical"
          {...(index === 3 && {color:"primary"})}
          >
            <ListItemDecorator sx={{ mb: "1px"}}>
              <Person />
              &nbsp;Profile
            </ListItemDecorator>
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}