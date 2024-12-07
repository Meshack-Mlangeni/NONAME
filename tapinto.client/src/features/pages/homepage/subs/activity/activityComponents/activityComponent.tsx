/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  DeleteForever,
  FavoriteRounded,
  ForumRounded,
  MoreVert,
  SendRounded,
  Verified,
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
  Input,
  Link,
} from "@mui/joy";
import { useRef, useState } from "react";
import PopQuizComponent from "./popQuizComponent";
import { _ActivityType } from "./_ActivityType";
import { NavLink } from "react-router-dom";
import abbreviateNumber from "../../../../../../helpers/abbreviateNumber";
import convertFullNamesToInitials from "../../../../../../helpers/convertFullNameToInitials";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../app/store/store";
import {
  commentOnActivityAsync,
  getAllActivityChatsAsync,
  getAllActivityCommentsAsync,
  likeActivityAsync,
  resetComments,
} from "../activitySlice";
import { FieldValues, useForm } from "react-hook-form";
import convertToDateTimeAgo from "../../../../../../helpers/convertToDateTimeAgo";
import { Answer } from "../../../../../../models/answers";
import Theme from "../../../../../../app/theme/theme";

interface IActivityProps {
  id: number;
  hasLiveDiscussion?: boolean;
  ActivityType?: _ActivityType;
  timestamp: string;
  activityImage: string;
  comments_no: number;
  likes: number;
  answers: Answer[];
  activityContent?: string;
  groupName: string;
  userFullNames: string;
  userActivityEmail: string;
  currentUserLiked: boolean;
  verified: boolean;
}

export default function ActivityComponent({
  id,
  ActivityType = _ActivityType.Activity,
  timestamp = "",
  likes = 0,
  activityContent = "",
  groupName,
  userFullNames,
  userActivityEmail,
  currentUserLiked,
  verified,
  activityImage,
  answers,
  comments_no,
}: IActivityProps) {
  console.log("Answers in act: ", answers);
  const [Like, setLike] = useState<number>(likes);
  const [noOfComments, setNoOfComments] = useState<{
    activityId: number;
    numberOfComments: number;
  }>({ activityId: id, numberOfComments: comments_no });
  const [hasUserLiked, setHasUserLiked] = useState<boolean>(currentUserLiked);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const { activityComments } = useAppSelector((state) => state.activities);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onCommentSubmit = async (data: FieldValues) => {
    await dispatch(resetComments());
    await dispatch(
      commentOnActivityAsync({ ...data, activityId: id } as FieldValues)
    );
    setNoOfComments((prevState) => ({
      activityId: id,
      numberOfComments: prevState.numberOfComments + 1,
    }));
    reset();
  };

  const fetchCommentsForActivity = (id: number) => {
    return dispatch(getAllActivityCommentsAsync(id));
  };

  const self = useRef<HTMLDivElement>(null);

  self.current &&
    self.current?.addEventListener("animationend", () => {
      self.current!.classList.remove("fade-in");
    });

  /*
        Hello I'm a big component I have

        PopQuizComponent
        Picture and Content Start
        check If its a post include like and comment else the Join Disc Button
        This is the comments modal
        Like and comment buttons
        Beginning of a live discussion component
        ************* All in order as written ************
    */

  const activity_avatar = (
    verified: boolean,
    fullnames: string,
    type: string,
    timestamp: string,
    groupName?: string
  ) => {
    return type === "Activity" ? (
      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
        <Avatar
          sx={{ boxShadow: "sm", mt: 0.2 }}
          alt={userFullNames}
          variant="solid"
          color="neutral"
          size="lg"
        >
          {convertFullNamesToInitials(fullnames)}
        </Avatar>
        <div>
          <Typography level={"title-lg"}>
            <Link
              //@ts-expect-error
              color={Theme.palette.common.black}
              href="google.com"
            >
              {fullnames}
            </Link>
            {verified && (
              <Verified
                sx={{ fontSize: "sm", mt: -0.2, ml: 0.3 }}
                color="success"
              />
            )}
          </Typography>
          <Typography color="neutral" variant="plain" level="title-md">
            {groupName && <strong>{groupName}</strong>}
            <span style={{ fontWeight: 300 }}>
              {(groupName ? " | " : "") + timestamp}
            </span>
          </Typography>
        </div>
      </Box>
    ) : (
      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
        <Avatar
          sx={{ boxShadow: "sm", mt: 0.6, "--Avatar-size": "28px" }}
          alt={userFullNames}
          variant="solid"
          color="primary"
        >
          {convertFullNamesToInitials(fullnames)}
        </Avatar>
        <div>
          <Typography sx={{ mt: 1 }} level={"title-sm"}>
            {fullnames}
            {verified && (
              <Verified
                sx={{ mt: -0.3, ml: 0.3, fontSize: "sm" }}
                color="success"
              />
            )}
            <Typography color="neutral" level={"title-sm"}>
              {" - " + timestamp}
            </Typography>
          </Typography>
        </div>
      </Box>
    );
  };

  const poll = (
    <PopQuizComponent
      activityId={id}
      question={activityContent}
      answers={answers}
    />
  );
  const activityOrdiscussion = (
    <>
      {/* Picture and Content Start */}
      {activityImage && (
        <CardOverflow sx={{ m: 0.5, boxShadow: "sm" }}>
          <AspectRatio>
            <img
              style={{ objectFit: "fill" }}
              src={activityImage}
              alt="This is the image of the post"
              loading="lazy"
            />
          </AspectRatio>
        </CardOverflow>
      )}
      <Box sx={{ display: "flex", gap: 1.5, mt: 1, mb: 1, ml: 0.5 }}>
        <CardContent orientation="horizontal">
          <Typography level="title-lg">{activityContent}</Typography>
        </CardContent>
      </Box>
      {/* Picture and Content End */}

      {/* If its a post include like and comment else the Join Disc Button */}
      {/* Start */}
      {ActivityType === _ActivityType.Activity ? (
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
                console.log("TJos is the id: ", id);
                dispatch(likeActivityAsync(id));
                if (hasUserLiked) setLike(Like - 1);
                else setLike(Like + 1);
                setHasUserLiked(!hasUserLiked);
              }}
            >
              {abbreviateNumber(Like)}
            </Button>

            {/* start */}
            <Button
              variant="plain"
              color="neutral"
              startDecorator={<ForumRounded />}
              sx={{
                "--Button-gap": "13px",
              }}
              onClick={async () => {
                if (self.current) {
                  const someElementsOpened =
                    document.getElementsByClassName("comments-css");
                  Array.from(someElementsOpened).forEach((elementOpened) => {
                    if (elementOpened !== self.current) {
                      elementOpened.classList.remove("comments-css");
                    }
                  });
                  dispatch(resetComments());
                  if (!self.current.classList.contains("comments-css")) {
                    await fetchCommentsForActivity(id).then(() => {
                      self.current!.classList.add("comments-css");
                      self.current!.classList.add("fade-in");
                    });
                  } else {
                    self.current.classList.remove("comments-css");
                    dispatch(resetComments());
                  }
                }
              }}
            >
              {abbreviateNumber(noOfComments.numberOfComments)}
            </Button>
            <Sheet
              sx={(theme) => ({
                backgroundColor: theme.palette.background.level1,
                display: "none",
              })}
              ref={self}
            >
              <Typography sx={{ ml: 2, mt: 2, mb: 2 }} level="title-lg">
                Comments
              </Typography>
              <Stack
                sx={{
                  overflowY: "scroll",
                  maxHeight: "300px",
                }}
              >
                {activityComments.map((c) => (
                  <Box
                    sx={(theme) => ({
                      mt: 1,
                      ml: 2,
                      mr: 2,
                      borderBottom: `2px ${
                        theme.palette.mode === "dark"
                          ? theme.palette.neutral[700]
                          : theme.palette.neutral[300]
                      } dashed`,
                    })}
                  >
                    {activity_avatar(
                      c.verified,
                      c.fullNames,
                      "Comment",
                      convertToDateTimeAgo(c.timeStamp),
                      undefined
                    )}
                    <Typography sx={{ m: 1, mb: 2 }} level="title-lg">
                      {c.commentContent}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Sheet
                sx={(theme) => ({
                  backgroundColor: theme.palette.background.level1,
                  m: 2,
                  p: 1,
                })}
              >
                <form onSubmit={handleSubmit(onCommentSubmit)}>
                  <Input
                    startDecorator={<SendRounded />}
                    {...register("CommentContent", {
                      required: "Please type in comment",
                    })}
                    endDecorator={
                      <Button disabled={!isValid} type="submit">
                        Send Comment
                      </Button>
                    }
                  />
                </form>
              </Sheet>
            </Sheet>
          </Sheet>
        </>
      ) : (
        <>
          <Stack direction="row" spacing={1}>
            <Button
              variant="soft"
              color="danger"
              onClick={async () => await dispatch(getAllActivityChatsAsync(id))}
              component={NavLink}
              to={`/home/live/${id}`}
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
        {activity_avatar(
          verified,
          userFullNames,
          "Activity",
          timestamp,
          groupName
        )}
        {/* Avatar Box End */}
        {/* Post Dropdown Start */}
        {userActivityEmail &&
          user &&
          userActivityEmail.toLowerCase() === user?.email.toLowerCase() && (
            <>
              <Dropdown>
                <MenuButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ ml: "auto" }}
                  slots={{ root: IconButton }}
                  slotProps={{
                    root: { variant: "outlined", color: "neutral" },
                  }}
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

      {/* Poll Component Start */}
      {ActivityType === _ActivityType.Poll && poll}
      {/* Poll Component End */}
      {/* Post or Discussion Component Start */}
      {(ActivityType === _ActivityType.Activity ||
        ActivityType === _ActivityType.Discussion) &&
        activityOrdiscussion}
      {/* Post or Discussion Component End */}
    </Card>
  );
}
