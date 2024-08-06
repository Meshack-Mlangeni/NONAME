import {
  DeleteForever,
  FavoriteRounded,
  ForumRounded,
  MoreVert,
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
  MenuButton,
  Dropdown,
  ListItemDecorator,
  MenuItem,
  Menu,
} from "@mui/joy";
import React, { useState } from "react";
import PopQuizComponent from "./popQuizComponent";
import { _PostType } from "./_PostType";
import { NavLink } from "react-router-dom";
import abbreviateNumber from "../../../../../../helpers/abbreviateNumber";
import convertFullNamesToInitials from "../../../../../../helpers/convertFullNameToInitials";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../app/store/store";
import { likeActivityAsync } from "../postSlice";

interface IPostProps {
  id: number;
  hasLiveDiscussion?: boolean;
  Labels?: React.ReactNode;
  PostType?: _PostType;
  timestamp: string;
  likes: number;
  post_content?: string;
  groupName: string;
  userFullNames: string;
  userPostEmail: string;
  currentUserLiked: boolean;
}

export default function PostComponent({
  id,
  Labels,
  PostType = _PostType.Post,
  timestamp = "",
  likes = 0,
  post_content = "",
  groupName,
  userFullNames,
  userPostEmail,
  currentUserLiked,
}: IPostProps) {
  const [Like, setLike] = useState<number>(likes);
  const [hasUserLiked, setHasUserLiked] = useState<boolean>(currentUserLiked);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const poll = (
    <PopQuizComponent
      question={"Who is the greatest player ever"}
      answers={["CR7", "NEY", "Messi", "Hazard"]}
    />
  );
  // The !!0 is to temporaly hide the image
  const postOrdisc = (
    <>
      {/* Picture and Content Start */}
      {!!0 && (
        <CardOverflow>
          <AspectRatio>
            <img src="../public/test.jpg" alt="" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
      )}
      <Box sx={{ display: "flex", gap: 1.5, mt: "1" }}>
        <CardContent orientation="horizontal">
          <Typography level="body-lg">{post_content}</Typography>
        </CardContent>
      </Box>
      {/* Picture and Content End */}

      {/* If its a post include like and comment else the Join Disc Button */}
      {/* Start */}
      {PostType === _PostType.Post ? (
        <>
          <Sheet
            variant="soft"
            sx={(theme) => ({
              borderRadius: "md",
              p: 0.2,
              border: `2px ${
                theme.palette.mode === "dark"
                  ? theme.palette.neutral[700]
                  : theme.palette.neutral[300]
              } dashed`,

              fontWeight: "xl",
            })}
          >
            <Button
              variant="soft"
              color={hasUserLiked ? "danger" : "neutral"}
              startDecorator={
                <FavoriteRounded
                  sx={{ color: hasUserLiked ? "crimson" : "black" }}
                />
              }
              sx={{
                "--Button-gap": "13px",
              }}
              onClick={() => {
                dispatch(likeActivityAsync(id));
                if (hasUserLiked) setLike(Like - 1);
                else setLike(Like + 1);
                setHasUserLiked(!hasUserLiked);
              }}
            >
              {abbreviateNumber(Like)}
            </Button>

            <Button
              variant="plain"
              color="neutral"
              startDecorator={<ForumRounded />}
              sx={{
                "--Button-gap": "13px",
              }}
            >
              {(() => {
                const noOfComments = 0;
                return abbreviateNumber(noOfComments);
              })()}
            </Button>
          </Sheet>
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
  );
  {
    /* End */
  }

  return (
    <Card sx={{ mt: 2, mb: 2 }}>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        {/* Avatar Box Start */}
        <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
          <Avatar
            sx={{ boxShadow: "sm" }}
            alt={userFullNames}
            variant="solid"
            color="neutral"
          >
            {convertFullNamesToInitials(userFullNames)}
          </Avatar>
          <div>
            <Typography sx={{ fontWeight: "md" }} level="body-md">
              {userFullNames}
            </Typography>
            <Typography level="body-sm">
              <strong>{groupName}</strong> |{" " + timestamp}
            </Typography>
          </div>
        </Box>
        {/* Avatar Box End */}
        {/* Post Dropdown Start */}
        {userPostEmail.toLowerCase() === user?.email.toLowerCase() && (
          <>
            <Dropdown>
              <MenuButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: "outlined", color: "neutral" } }}
              >
                <MoreVert />
              </MenuButton>
              <Menu placement="bottom-end">
                <MenuItem variant="soft">
                  <ListItemDecorator>
                    <DeleteForever />
                  </ListItemDecorator>{" "}
                  Delete
                </MenuItem>
              </Menu>
            </Dropdown>
          </>
        )}
        {/* Post Dropdown End */}
      </CardContent>

      {/* Post Labels Start */}
      {Labels && <CardContent orientation="horizontal">{Labels}</CardContent>}
      {/* Post Labels End */}

      {/* Poll Component Start */}
      {PostType === _PostType.Poll && poll}
      {/* Poll Component End */}
      {/* Post or Discussion Component Start */}
      {(PostType === _PostType.Post || PostType === _PostType.Discussion) &&
        postOrdisc}
      {/* Post or Discussion Component End */}
    </Card>
  );
}
