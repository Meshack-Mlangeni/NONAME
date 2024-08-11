/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Grid, useMediaQuery } from "@mui/material";
import Post from "./posts_components/postCreateComponent";
import Bio from "./posts_components/bioComponent";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  ColorPaletteProp,
  Typography,
} from "@mui/joy";
import PostComponent from "./posts_components/postComponent";
import MyGroups from "./posts_components/myGroupsComponent";
import { getallActivityAsync, postSelector } from "./postSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/store";
import convertToDateTimeAgo from "../../../../../helpers/convertToDateTimeAgo";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  ArrowUpwardTwoTone,
} from "@mui/icons-material";
import { useState } from "react";

export default function Posts() {
  const Tablet = useMediaQuery("(min-width:1100px)");
  const posts = useAppSelector(postSelector.selectAll);
  const dispatch = useAppDispatch();
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const { labels } = useAppSelector((state) => state.activities);
  const [hasScrolled, setHasScrolled] = useState(false);

  window.onscroll = function () {
    const distanceScrolled = document.documentElement.scrollTop!;
    if (distanceScrolled > 112) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  return (
    <Box
      {...(!Tablet
        ? { sx: { mt: 2, ml: 1, mr: 1 } }
        : { sx: { mt: 2, ml: 2, mr: 2 } })}
    >
      <Grid container spacing={2}>
        <Grid item xs={!Tablet ? 12 : 8}>
          <Box {...(Tablet && { sx: { ml: 1, mr: 1 } })}>
            <Button
              onClick={() => {
                document.documentElement.scrollTop = 0;
                setHasScrolled(false);
              }}
              color="primary"
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 10,
                boxShadow: "lg",
                visibility: hasScrolled ? "visible" : "hidden",
              }}
              aria-label="add"
            >
              <ArrowUpwardTwoTone />
            </Button>
            <InfiniteScroll
              dataLength={posts.length}
              next={async () => {
                const offset = posts.length + 5;
                await dispatch(getallActivityAsync(offset)).then((data) => {
                  if (!((data.payload as []).length > 0)) {
                    setHasMoreData(false);
                  }
                });
              }}
              hasMore={hasMoreData}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>🎊 Hooray! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
              refreshFunction={async () => {
                await dispatch(getallActivityAsync(5));
              }}
              loader={
                <p style={{ textAlign: "center" }}>
                  <CircularProgress />
                </p>
              }
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <Typography
                  level="body-md"
                  sx={{ mt: 1, mb: 1 }}
                  style={{ textAlign: "center" }}
                >
                  <ArrowDownwardRounded /> Pull down to refresh
                </Typography>
              }
              releaseToRefreshContent={
                <Typography
                  level="body-md"
                  sx={{ mt: 1, mb: 1 }}
                  style={{ textAlign: "center" }}
                >
                  <ArrowUpwardRounded /> Release to refresh
                </Typography>
              }
            >
              <Post />

              {posts.length > 0 ? (
                posts.map((post, index) => {
                  return (
                    <PostComponent
                      id={post.id}
                      key={index}
                      groupName={post.groupName}
                      timestamp={convertToDateTimeAgo(post.timeStamp)}
                      post_content={post.postContent}
                      likes={post.likes}
                      PostType={post.postType}
                      userFullNames={post.userFullNames}
                      userPostEmail={post.userEmail}
                      verified={post.verified}
                      currentUserLiked={post.currentUserLiked}
                      Labels={(() => {
                        const lblChips = post.labels.split(",").map((l) => {
                          const getFromLabels = labels.find(
                            (lbl) => lbl.id === +l
                          );
                          if (!getFromLabels) return <></>;
                          return (
                            <Chip
                              key={getFromLabels?.id}
                              color={getFromLabels?.color as ColorPaletteProp}
                            >
                              {getFromLabels?.name}
                            </Chip>
                          );
                        });
                        return lblChips || null;
                      })()}
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
                    Be Adventurous, Try Posting Something or{" "}
                    <NavLink
                      style={{
                        fontWeight: "600",
                        color: "#512DA8",
                        textDecoration: "none",
                      }}
                      to="/"
                    >
                      Join A School Group!
                    </NavLink>
                  </Typography>
                </>
              )}
            </InfiniteScroll>
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
