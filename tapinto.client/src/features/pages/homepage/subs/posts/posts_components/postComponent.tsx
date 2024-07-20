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

interface IPostProps {
  hasLiveDiscussion?: boolean;
  Labels?: React.ReactNode;
  PostType?: _PostType;
  timestamp: string;
  likes: number;
  post_content?: string;
  groupName: string;
  userFullNames: string;
}

export default function PostComponent({
  Labels,
  PostType = _PostType.Post,
  timestamp = "",
  likes = 0,
  post_content = "",
  groupName,
  userFullNames,
}: IPostProps) {
  const [Like, setLike] = useState<number>(likes);

  return (
    <Card sx={{ mt: 2, mb: 2 }}>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
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
          <Box sx={{ display: "flex", gap: 1.5, mt: "1" }}>
            <CardContent orientation="horizontal">
              <Typography level="body-lg">{post_content}</Typography>
            </CardContent>
          </Box>

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
                    variant="plain"
                    color="neutral"
                    startDecorator={
                      <FavoriteRounded sx={{ color: "crimson" }} />
                    }
                    sx={{
                      "--Button-gap": "13px",
                    }}
                    onClick={() => setLike(Like + 1)}
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
                      const noOfComments = 125;
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
      ) : (
        <PopQuizComponent
          question={"Who is the greatest player ever"}
          answers={["CR7", "NEY", "Messi", "Hazard"]}
        />
      )}
    </Card>
  );
}
