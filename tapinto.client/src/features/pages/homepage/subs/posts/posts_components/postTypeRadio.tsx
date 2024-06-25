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
import Theme from "../../../../../../app/theme/theme";
import { useState } from "react";

interface RadioProps {
  register: UseFormRegister<FieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setsubmitbtntext: any;
}

export default function PostTypeRadio({
  register,
  setsubmitbtntext,
}: RadioProps) {
  const data = [
    ["Post", <PostAddRounded />],
    ["Poll", <PollRounded />],
    ["Discussion", <CommentRounded />],
  ];
  const [defaultValue, setDefaultValue] = useState<number>(0);
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
        onChange={(e) =>
          setsubmitbtntext(
            ("Create " + data[+e.target.value as number][0]) as string
          )
        }
        sx={{
          minHeight: 40,
          padding: "4px",
          borderRadius: "12px",
          "--RadioGroup-gap": "10px",
          "--Radio-actionRadius": "8px",
        }}
      >
        {data.map((item, index) => (
          <Radio
            key={index}
            checked={index === defaultValue}
            {...register("postType", {
              required: true,
              onChange: (e) => setDefaultValue(+e.target.defaultValue),
            })}
            color="neutral"
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
            variant="outlined"
            sx={{
              px: 2,
              alignItems: "center",
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    border: `3px ${
                      Theme.palette.mode === "dark"
                        ? Theme.palette.primary[500]
                        : Theme.palette.primary[500]
                    } solid`,
                    boxShadow: "sm",
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
