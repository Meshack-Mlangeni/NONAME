/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Grid, useMediaQuery } from "@mui/material";
import Post from "./activityComponents/createActivityComponent";
import Bio from "./activityComponents/bioComponent";
import { Box, Button, CircularProgress, Typography } from "@mui/joy";
import PostComponent from "./activityComponents/activityComponent";
import MyGroups from "./activityComponents/myGroupsComponent";
import { getallActivityAsync, resetActivities } from "./activitySlice";
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

export default function ShowActivitiesOnHomePage() {
  const Tablet = useMediaQuery("(min-width:1100px)");
  const { activities } = useAppSelector((state) => state.activities);
  const dispatch = useAppDispatch();
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
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
              dataLength={activities.length}
              next={async () => {
                const offset = activities.length + 5;
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
              refreshFunction={async () => {
                await dispatch(resetActivities());
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

              {activities.length > 0 ? (
                activities.map((activity, index) => {
                  return (
                    <PostComponent
                      id={activity.id}
                      key={activity.id + "-" + index}
                      groupName={activity.groupName}
                      timestamp={convertToDateTimeAgo(activity.timeStamp)}
                      activityContent={activity.activityContent}
                      likes={activity.likes}
                      ActivityType={activity.activityType}
                      activityImage={activity.imageUrl}
                      answers={activity.answers}
                      userFullNames={activity.userFullNames}
                      userActivityEmail={activity.userEmail}
                      verified={activity.verified}
                      comments_no={activity.comments}
                      currentUserLiked={activity.currentUserLiked}
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
