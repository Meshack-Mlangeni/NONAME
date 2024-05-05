import React from "react";
import {
  Box,
  Card,
  Button,
  CardContent,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Greetr from "../../../../../helpers/greetr/greetr";
import ShowPostTo from "./showpostto";
import { Send } from "@mui/icons-material";

export default function Post() {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file.name);
    }
  };

  return (
    <Card elevation={0} sx={{backgroundColor: "#FEFEFE"}}>
      <CardContent>
        <Greetr name="Meshack" surname="Mlangeni" tag="@Meshack-Mla" />
        <TextField
          className="mb-2"
          variant="outlined"
          fullWidth
          multiline
          size="small"
          placeholder="What's on your mind?"
        />
        <br />
        <Box display="flex" alignItems="center">
          <div>
            <Button size="small" variant="contained" color='error'>
              <Send/>  &nbsp; Post
            </Button>
            <input
              accept="*/*"
              style={{ display: "none" }}
              id="attach-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="attach-file">
              <IconButton color="secondary" component="span">
                <AttachFileIcon />
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
              <IconButton color="success" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </div>

          <Divider orientation="vertical" variant="middle" flexItem />

          <ShowPostTo def="Public" />
        </Box>
      </CardContent>
    </Card>
  );
}
