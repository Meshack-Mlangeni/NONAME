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
} from "@mui/joy";
import React, { useRef, useState } from "react";
import PopQuizComponent from "./popQuizComponent";
import { _PostType } from "./_PostType";
import { NavLink } from "react-router-dom";
import abbreviateNumber from "../../../../../../helpers/abbreviateNumber";
import convertFullNamesToInitials from "../../../../../../helpers/convertFullNameToInitials";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../app/store/store";
import {
  commentOnActivityAsync,
  getAllActivityComments,
  likeActivityAsync,
  resetComments,
} from "../postSlice";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import convertToDateTimeAgo from "../../../../../../helpers/convertToDateTimeAgo";
import { Answer } from "../../../../../../models/answers";

interface IPostProps {
  id: number;
  hasLiveDiscussion?: boolean;
  Labels?: React.ReactNode;
  PostType?: _PostType;
  timestamp: string;
  comments_no: number;
  likes: number;
  answers: Answer[];
  post_content?: string;
  groupName: string;
  userFullNames: string;
  userPostEmail: string;
  currentUserLiked: boolean;
  verified: boolean;
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
  verified,
  answers,
  comments_no,
}: IPostProps) {
  const [Like, setLike] = useState<number>(likes);
  const [noOfComments, setNoOfComments] = useState<{
    postId: number;
    numberOfComments: number;
  }>({ postId: id, numberOfComments: comments_no });
  const [hasUserLiked, setHasUserLiked] = useState<boolean>(currentUserLiked);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const { post_comments } = useAppSelector((state) => state.activities);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onCommentSubmit = async (data: FieldValues) => {
    await dispatch(
      commentOnActivityAsync({ ...data, postId: id } as FieldValues)
    ).then(async () => {
      await fetchCommentsForPost(id);
      setNoOfComments({
        postId: id,
        numberOfComments: noOfComments.numberOfComments + 1,
      });
    });
    reset();
  };

  const self = useRef<HTMLDivElement>(null);
  const fetchCommentsForPost = async (id: number) => {
    dispatch(resetComments());
    return await dispatch(getAllActivityComments(id));
  };

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

  const post_avatar = (
    verified: boolean,
    fullnames: string,
    type: string,
    timestamp: string,
    groupName?: string
  ) => {
    return type === "Post" ? (
      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
        <Avatar
          sx={{ boxShadow: "sm", mt: 0.6 }}
          alt={userFullNames}
          variant="solid"
          color="neutral"
          size="md"
        >
          {convertFullNamesToInitials(fullnames)}
        </Avatar>
        <div>
          <Typography level={"body-md"}>
            {fullnames}
            {verified && (
              <Verified
                sx={{ fontSize: "sm", mt: -0.2, ml: 0.3 }}
                color="success"
              />
            )}
          </Typography>
          <Typography level="body-sm">
            {groupName && <strong>{groupName}</strong>}
            {(groupName ? " | " : "") + timestamp}
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

  const poll = <PopQuizComponent question={post_content} answers={answers} />;
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

            {/* start */}
            <Button
              variant="plain"
              color="neutral"
              startDecorator={<ForumRounded />}
              sx={{
                "--Button-gap": "13px",
              }}
              onClick={() => {
                if (self.current !== null) {
                  if (!self.current.classList.contains("comments-css")) {
                    fetchCommentsForPost(id).then(
                      () => {
                        self.current!.classList.add("comments-css");
                        self.current!.classList.add("fade-in");
                      },
                      () => toast.error("There was an error fetching comments")
                    );
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
              <Typography sx={{ ml: 2, mt: 1 }} level="title-lg">
                Comments
              </Typography>
              <Stack
                sx={{
                  overflowY: "scroll",
                  maxHeight: "300px",
                }}
              >
                {post_comments.map((c) => (
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
                    {post_avatar(
                      c.verified,
                      c.fullNames,
                      "Comment",
                      convertToDateTimeAgo(c.timeStamp),
                      undefined
                    )}
                    <Typography sx={{ m: 1, mb: 2 }} level="title-sm">
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
        {post_avatar(verified, userFullNames, "Post", timestamp, groupName)}
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
