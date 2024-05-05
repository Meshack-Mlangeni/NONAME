import { Divider, Grid } from "@mui/material";
import Post from "./post";

export default function Posts() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Post />
          <Divider orientation='horizontal' variant="middle" flexItem />
        </Grid>
        <Grid item xs={4}>
          <h6>All Groups</h6>
        </Grid>
      </Grid>
    </>
  );
}
