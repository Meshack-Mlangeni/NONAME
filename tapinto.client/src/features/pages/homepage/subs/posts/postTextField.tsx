/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Box,
  Chip,
  ChipDelete,
  Textarea,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import Labels from "../../../../components/labelctr";
import { Add } from "@mui/icons-material";
import Dialog from "../../../../components/appdialog";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/store";
import { removeLabel } from "./postSlice";
import { toast } from "react-toastify";

export default function PostTextField() {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();
  const { labels } = useAppSelector((state) => state.posts);
  return (
    <Textarea
      placeholder="What's on your mind..."
      value={text}
      onChange={(event) => setText(event.target.value)}
      minRows={1}
      maxRows={4}
      startDecorator={
        <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
          <Dialog
            buttonIcon={<Add />}
            buttonName="Label(s)"
            isOpen={false}
            title="Select Labels For Post"
          >
            <Labels />
          </Dialog>
          <>
            {labels.map((lbl, idx) => (
              <Chip
                endDecorator={
                  <ChipDelete
                    onDelete={() => {
                      dispatch(removeLabel(lbl.name));
                      toast.warn(`${lbl.name} label removed`);
                    }}
                  />
                }
                // @ts-expect-error
                color={lbl.color ?? "danger"}
                key={idx}
              >
                {lbl.name}
              </Chip>
            ))}
          </>
        </Box>
      }
      endDecorator={
        <Typography level="body-xs" sx={{ ml: "auto" }}>
          {text.length} character(s)
        </Typography>
      }
      sx={{ minWidth: 300, width: "100%" }}
    />
  );
}
