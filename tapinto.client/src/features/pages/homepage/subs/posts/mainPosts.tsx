import { Grid, useMediaQuery } from "@mui/material";
import Post from "./posts_components/postCreateComponent";
import Bio from "./posts_components/bioComponent";
import { Box } from "@mui/joy";
import PostComponent from "./posts_components/postComponent";
import MyGroups from "./posts_components/myGroupsComponent";

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
            <PostComponent />
          </Box>
        </Grid>
        {Tablet && (
          <Grid item xs={4}>
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
