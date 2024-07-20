import { Grid, useMediaQuery } from "@mui/material";
import Post from "./posts_components/postCreateComponent";
import Bio from "./posts_components/bioComponent";
import { Box, Chip, Typography } from "@mui/joy";
import PostComponent from "./posts_components/postComponent";
import MyGroups from "./posts_components/myGroupsComponent";
import { _PostType } from "./posts_components/_PostType";
import { postSelector } from "./postSlice";
import { useAppSelector } from "../../../../../app/store/store";
import convertToDateTimeAgo from "../../../../../helpers/convertToDateTimeAgo";
import { NavLink } from "react-router-dom";

export default function Posts() {
  const Tablet = useMediaQuery("(min-width:1100px)");
  const posts = useAppSelector(postSelector.selectAll);

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
            {!(posts.length > 0) ? (
              posts.map((post, index) => {
                return (
                  <PostComponent
                    key={index}
                    groupName={post.groupName}
                    timestamp={convertToDateTimeAgo(post.timeStamp)}
                    post_content={post.postContent}
                    likes={998}
                    PostType={post.postType}
                    userFullNames={post.userFullNames}
                    Labels={
                      <>
                        <Chip color="danger">Quiz</Chip>
                      </>
                    }
                  />
                );
              })
            ) : (
              <>
                <Box
                  alignContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                >
                  <img
                    style={{
                      marginTop: "16px",
                      display: "inline-block",
                      width: "10rem",
                    }}
                    src="../_nothingHere.png"
                  />
                </Box>
                <Typography
                  sx={{ mt: 2, textAlign: "center", fontWeight: "500" }}
                  level="h3"
                >
                  You Currently Have No Activity
                </Typography>
                <Typography
                  sx={{ mb: 4, textAlign: "center", fontWeight: "200" }}
                  level="body-md"
                >
                  Be Adventurous, Try Posting Something or <NavLink style={{fontWeight:"600", color:"#512DA8", textDecoration: "none"}} to="/">Join A School Group!</NavLink>
                </Typography>
              </>
            )}
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
