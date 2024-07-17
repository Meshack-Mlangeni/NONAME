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
  Tooltip,
} from "@mui/joy";
import React, { useState } from "react";
import PopQuizComponent from "./popQuizComponent";
import { _PostType } from "./_PostType";
import { NavLink } from "react-router-dom";
import abbreviateNumber from "../../../../../../helpers/abbreviateNumber";

interface IPostProps {
  hasLiveDiscussion?: boolean;
  Labels?: React.ReactNode;
  PostType?: _PostType;
  likes: number;
  post_content?: string;
}

export default function PostComponent({
  Labels,
  PostType = _PostType.Post,
  likes = 0,
  post_content = "",
}: IPostProps) {
  const [Like, setLike] = useState<number>(likes);

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
      </CardContent>
      {Labels && <CardContent orientation="horizontal">{Labels}</CardContent>}
      {/* //remove false to display image */}
      {PostType !== _PostType.Poll ? (
        <>
          {!!0 && (
            <CardOverflow>
              <AspectRatio>
                <img src="../public/test.jpg" alt="" loading="lazy" />
              </AspectRatio>
            </CardOverflow>
          )}
          <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
            {PostType === _PostType.Post && (
              <Box>
                <Sheet
                  variant="soft"
                  sx={(theme) => ({
                    p: 0.5,
                    borderRadius: "md",
                    border: `2px ${
                      theme.palette.mode === "dark"
                        ? theme.palette.neutral[700]
                        : theme.palette.neutral[300]
                    } dashed`,
                    justifyContent: "center",
                    justifyItems: "center",
                    textAlign: "center",
                    fontWeight: "xl",
                  })}
                >
                  <Tooltip
                    title="Love"
                    variant="solid"
                    color="success"
                    placement="right-end"
                  >
                    <IconButton onClick={() => setLike(Like + 1)}>
                      <FavoriteRounded />
                    </IconButton>
                  </Tooltip>
                  <br />
                  {abbreviateNumber(Like)}
                </Sheet>
                <Sheet
                  variant="soft"
                  sx={(theme) => ({
                    mt: 1,
                    p: 0.5,
                    borderRadius: "md",
                    border: `2px ${
                      theme.palette.mode === "dark"
                        ? theme.palette.neutral[700]
                        : theme.palette.neutral[300]
                    } dashed`,
                    justifyContent: "center",
                    justifyItems: "center",
                    textAlign: "center",
                    fontWeight: "xl",
                  })}
                >
                  <IconButton onClick={() => setLike(Like - 1)}>
                    <Tooltip title="Comment(s)" placement="right-end">
                      <ForumRounded />
                    </Tooltip>
                  </IconButton>
                </Sheet>
              </Box>
            )}
            <CardContent sx={{ mt: 1 }} orientation="horizontal">
              <Typography level="body-lg">{post_content}</Typography>
            </CardContent>
          </Box>

          {PostType === _PostType.Post ? (
            <></>
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
