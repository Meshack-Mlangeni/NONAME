/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Add, Close } from "@mui/icons-material";
import { Autocomplete, Button, Chip } from "@mui/joy";
import { addLabel } from "../pages/homepage/subs/posts/postSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { Label } from "../../models/label";
import Dialog from "./appdialog";

export default function Labels() {
  const dispatch = useAppDispatch();
  const { labels } = useAppSelector((state) => state.activities);
  let selectedLabels: Label[] = [];

  return (
    <>
      <Dialog
        buttonIcon={<Add />}
        buttonName="Label(s)"
        isOpen={false}
        title="Select Labels For Post"
      >
        <Autocomplete
          multiple
          placeholder="Add label"
          options={labels}
          variant="soft"
          size="sm"
          limitTags={2}
          sx={{ mt: 1, paddingLeft: 1, paddingRight: 1 }}
          getOptionLabel={(option) => option.name}
          renderTags={(tags, getTagProps) => {
            selectedLabels = tags;
            return tags.map((item, index) => (
              <Chip
                variant="solid"
                // @ts-expect-error
                color={item.color ?? "neutral"}
                endDecorator={<Close fontSize="small" />}
                sx={{ minWidth: 0 }}
                {...getTagProps({ index })}
              >
                {item.name}
              </Chip>
            ));
          }}
        />
        <Button
          onClick={() => {
            dispatch(addLabel(selectedLabels));
          }}
        >
          Apply labels
        </Button>
      </Dialog>
    </>
  );
}
