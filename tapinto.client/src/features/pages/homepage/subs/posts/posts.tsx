import { Divider, Grid, useMediaQuery } from "@mui/material";
import Post from "./post";
import Bio from "../../bio";

export default function Posts() {
  const Tablet = useMediaQuery('(min-width:1000px)');
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={!Tablet ? 12 : 8}>
          <Post />
          <Divider orientation='horizontal' variant="middle" flexItem />
        </Grid>
        {Tablet && <Grid sx={{alignContent:'center'}} item xs={4}>
          <Bio/>
        </Grid>}
      </Grid>
    </>
  );
}
