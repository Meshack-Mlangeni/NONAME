import * as React from "react";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { PostType } from "../../../../../../models/posttype";
import {
  CommentRounded,
  PollRounded,
  PostAddRounded,
} from "@mui/icons-material";

interface RadioProps {
  register: UseFormRegister<FieldValues>;
}

export default function PostTypeRadio({ register }: RadioProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 2,
      }}
    >
      <RadioGroup
        orientation="horizontal"
        sx={(theme) => ({
          minHeight: 38,
          padding: "4px",
          border: `1px ${
            theme.palette.mode === "dark" ? "#32383E" : "#F0F0F0"
          } solid`,
          borderRadius: "12px",
          bgcolor: "neutral.softBg",
          "--RadioGroup-gap": "4px",
          "--Radio-actionRadius": "8px",
        })}
      >
        {[
          ["Post", <PostAddRounded />],
          ["Poll", <PollRounded />],
          ["Discussion", <CommentRounded />],
        ].map((item, index) => (
          <Radio
            key={index}
            {...register("postType", { required: true })}
            color=""
            value={
              item[0] === "Post"
                ? (0 as PostType)
                : item[0] === "Poll"
                ? (1 as PostType)
                : (2 as PostType)
            }
            disableIcon
            label={
              <>
                {item[1]} &nbsp;
                {item[0]}
              </>
            }
            variant="plain"
            sx={{
              px: 2,
              alignItems: "center",
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: "#096E9B",
                    boxShadow: "sm",
                    "&:hover": {
                      bgcolor: "#D1EEFD",
                    },
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
