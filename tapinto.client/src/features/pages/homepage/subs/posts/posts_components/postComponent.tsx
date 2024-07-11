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
  Sheet,
  Button,
  CardOverflow,
  AspectRatio,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/joy";
import React from "react";
import PopQuizComponent from "./popQuizComponent";
import { _PostType } from "./_PostType";
import { NavLink, useNavigate } from "react-router-dom";

interface IPostProps {
  hasLiveDiscussion?: boolean;
  Labels?: React.ReactNode;
  PostType?: _PostType;
}

export default function PostComponent({
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
            <Typography sx={{ fontWeight: "md" }} level="body-md">
              Mncedisi Mlangeni
            </Typography>
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
      {Labels && <CardContent orientation="horizontal">{Labels}</CardContent>}
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

          {PostType === _PostType.Post ? (
            <>
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
              </CardContent>
            </>
          ) : (
            <>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="soft"
                  color="danger"
                  component={NavLink}
                  to={"/home/live"}
                >
                  <Chip color="danger">
                    LIVE
                    <LinearProgress
                      variant="soft"
                      color="danger"
                      determinate={false}
                      size="sm"
                    />
                  </Chip>{" "}
                  &nbsp; Join Discussion Room
                </Button>
              </Stack>
            </>
          )}
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
