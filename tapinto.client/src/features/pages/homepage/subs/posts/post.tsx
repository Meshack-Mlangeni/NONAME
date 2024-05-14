import React from "react";
import {
  Box,
  Card,
  Button,
  CardContent,
  IconButton,
  Input,
  Chip,
  ChipDelete,
} from "@mui/joy";
import {
  Add,
  AttachFileOutlined,
  PhotoCameraOutlined,
  Send,
} from "@mui/icons-material";
import ShowTo from "./showpostto";
import Labels from "../../../../components/labelctr";
import { Divider, useMediaQuery } from "@mui/material";
import Dialog from "../../../../components/appdialog";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/store";
import { increment, removeLabel } from "./postSlice";
import PostTextField from "./postTextField";

///TODO input chips
export default function Post() {
  const dispatch = useAppDispatch();
  const { labels } = useAppSelector((state) => state.posts);

  const Mobile = useMediaQuery("(min-width:600px)");
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file.name);
    }
  };

  console.log(labels);

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          {/* <Input
            sx={{ mt: 1 }}
            fullWidth
            startDecorator={
             
            }
            placeholder="What's on your mind?"
          /> */}
          <PostTextField/>
        </Box>

        <Box sx={{ mt: 1 }} display="flex" alignItems="center">
          <div>
            <Button
              onClick={() => dispatch(increment(1))}
              size="sm"
              sx={{ mr: 1 }}
              variant="solid"
            >
              <Send /> &nbsp; Post
            </Button>

            <input
              accept="*/*"
              style={{ display: "none" }}
              id="attach-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="attach-file">
              <IconButton size="sm" color="warning" component="span">
                <AttachFileOutlined />
              </IconButton>
            </label>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="attach-photo"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="attach-photo">
              <IconButton size="sm" color="success" component="span">
                <PhotoCameraOutlined />
              </IconButton>
            </label>
          </div>
          {Mobile && <br />}
          <>
            <Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />
            <ShowTo />
          </>
        </Box>
      </CardContent>
    </Card>
  );
}
