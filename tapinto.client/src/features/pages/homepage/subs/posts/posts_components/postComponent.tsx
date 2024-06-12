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
  Button,
  CardOverflow,
  AspectRatio,
} from "@mui/joy";
import React from "react";
import PopQuizComponent from "./popQuizComponent";
import { _PostType } from "./_PostType";

interface IPostProps {
  hasLiveDiscussion?: boolean;
  Labels?: React.ReactNode;
  PostType?: _PostType;
}

export default function PostComponent({
  hasLiveDiscussion = false,
  Labels,
  PostType = _PostType.Post,
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
          {(PostType === _PostType.Discussion && (
            <Chip color="danger">
              Live Discussion
              <LinearProgress
                variant="plain"
                color="danger"
                determinate={false}
                size="sm"
              />
            </Chip>
          )) ||
            Labels}
        </CardContent>
      )}
      {/* //remove false to display image */}
      {PostType !== _PostType.Poll ? (
        <>
          {false && (
            <CardOverflow>
              <AspectRatio>
                <img src="../public/test.jpg" alt="" loading="lazy" />
              </AspectRatio>
            </CardOverflow>
          )}

          <CardContent sx={{ mt: 1 }} orientation="horizontal">
            <Typography level="body-md">
              How can we balance this equation: P4O10 + H2O → H3PO4
            </Typography>
          </CardContent>

          { PostType === _PostType.Post ?
            <><CardContent sx={{ mt: 1 }} orientation="horizontal">
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
                  <ExpandLessRounded />
                </IconButton>
                <Typography
                  color="primary"
                  fontWeight={"md"}
                  alignSelf={"center"}
                  level="body-sm"
                >
                  54 upvote(s)
                </Typography>
                <IconButton color="primary">
                  <ExpandMoreRounded />
                </IconButton>
              </CardContent>
            </Sheet>

            <Button variant="soft" color="primary">
              <Typography
                color="primary"
                fontWeight={"md"}
                alignSelf={"center"}
                level="body-sm"
              >
                54 comment(s)
              </Typography>
            </Button>
          </CardContent></>
        : <Button variant="soft" color="danger">Join Discussion Room</Button>  
        }
        </>
      ) : (
        <PopQuizComponent
          question={"Who is the greatest player ever"}
          answers={["CR7", "NEY", "Messi", "Hazard"]}
        />
      )}
    </Card>
  );
}
