import { Grid, useMediaQuery } from "@mui/material";
import Post from "./post";
import Bio from "./bio";
import { Box } from "@mui/joy";
import MyGroups from "./ub_mygroups";

export default function Posts() {
  const Tablet = useMediaQuery("(min-width:1100px)");
  return (
    <Box
      {...(!Tablet
        ? { sx: { mt: 2, ml: 1, mr: 1 } }
        : { sx: { mt: 2, ml: 2, mr: 2 } })}
    >
      <Grid container spacing={4}>
        <Grid item xs={!Tablet ? 12 : 8}>
          <Box {...(Tablet) && { sx: { ml: 1, mr: 1 } }}>
            <Post />
          </Box>
        </Grid>
        {Tablet && (
          <Grid sx={{ alignContent: "center" }} item xs={4}>
            <Box {...(Tablet) && { sx: { ml: 1, mr: 1 } }}>
              <Bio />
              <MyGroups/>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
