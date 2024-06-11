import {
  ExpandLessRounded,
  ExpandMoreRounded,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Card,
  Box,
  Avatar,
  Typography,
  CardContent,
  IconButton,
  Chip,
  Sheet,
  LinearProgress,
  Divider,
  CardOverflow,
  AspectRatio,
} from "@mui/joy";
import React from "react";

interface IPostProps {
  hasLiveDiscussion?: boolean;
  Labels?: React.ReactNode;
}

export default function PostComponent({
  hasLiveDiscussion = false,
  Labels,
}: IPostProps) {
  return (
    <Card sx={{ mt: 2, mb: 2 }}>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
          <Avatar variant="soft" color="neutral">
            MM
          </Avatar>
          <div>
            <Typography level="body-sm">Mncedisi Mlangeni</Typography>
            <Typography level="body-xs">15 Min Ago</Typography>
          </div>
        </Box>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        >
          <MoreHoriz />
        </IconButton>
      </CardContent>
      {(Labels || hasLiveDiscussion) && (
        <CardContent orientation="horizontal">
          {hasLiveDiscussion && (
            <Chip color="danger">
              Live Discussion
              <LinearProgress
                variant="plain"
                color="danger"
                determinate={false}
                size="sm"
              />
            </Chip>
          )}
          {Labels}
        </CardContent>
      )}

      <CardOverflow>
        <AspectRatio>
          <img src="../public/test.jpg" alt="" loading="lazy" />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ mt: 1 }} orientation="horizontal">
        <Typography level="body-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Typography>
      </CardContent>
      <CardContent sx={{ mt: 1 }} orientation="horizontal">
        <Sheet
          sx={{
            alignContent: "space-evenly",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "6px",
            maxHeight: "110px",
          }}
          variant="soft"
          color="primary"
        >
          <CardContent orientation="horizontal">
            <IconButton color="primary">
              <ExpandMoreRounded />
            </IconButton>
            <Typography color="primary" alignSelf={"center"} level="body-xs">
              54 upvote(s)
            </Typography>
            <IconButton color="primary">
              <ExpandLessRounded />
            </IconButton>
            <Divider orientation="vertical" />
            <IconButton color="primary">
              <Typography
                color="primary"
                sx={{ ml: 2, mr: 2 }}
                alignSelf={"center"}
                level="body-xs"
              >
                54 comment(s)
              </Typography>
            </IconButton>
          </CardContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}
