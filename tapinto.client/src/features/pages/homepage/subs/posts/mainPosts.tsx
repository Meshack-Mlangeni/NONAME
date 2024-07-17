import { Grid, useMediaQuery } from "@mui/material";
import Post from "./posts_components/postCreateComponent";
import Bio from "./posts_components/bioComponent";
import { Box, Chip } from "@mui/joy";
import PostComponent from "./posts_components/postComponent";
import MyGroups from "./posts_components/myGroupsComponent";
import { _PostType } from "./posts_components/_PostType";

export default function Posts() {
  const Tablet = useMediaQuery("(min-width:1100px)");
  return (
    <Box
      {...(!Tablet
        ? { sx: { mt: 2, ml: 1, mr: 1 } }
        : { sx: { mt: 2, ml: 2, mr: 2 } })}
    >
      <Grid container spacing={2}>
        <Grid item xs={!Tablet ? 12 : 8}>
          <Box {...(Tablet && { sx: { ml: 1, mr: 1 } })}>
            <Post />
            <PostComponent
              post_content="How can we balance this equation: P4O10 + H2O → H3PO4"
              likes={998}
              PostType={_PostType.Post}
              Labels={
                <>
                  <Chip color="danger">Quiz</Chip>
                </>
              }
            />
          </Box>
        </Grid>
        {Tablet && (
          <Grid item xs={4}>
            <Box {...(Tablet && { sx: { ml: 2, mr: 2 } })}>
              <Bio />
              <MyGroups />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
