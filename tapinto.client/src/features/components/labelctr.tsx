/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Close } from "@mui/icons-material";
import { Autocomplete, Chip } from "@mui/joy";
import { useDispatch } from "react-redux";
import { addLabel } from "../pages/homepage/subs/posts/postSlice";
import { useAppSelector } from "../../app/store/store";
import { toast } from "react-toastify";

export default function Labels() {
  const dispatch = useDispatch();
  const { labels } = useAppSelector((state) => state.posts);
  console.log(labels);

  let defaultlabels = [
    { name: "Question", color: "success" },
    { name: "Need Help", color: "danger" },
    { name: "Suggestion", color: "warning" },
  ];

  if (labels.length > 0) {
    defaultlabels = defaultlabels.filter(
      (dlbl) => labels.findIndex((lbl) => lbl.name === dlbl.name) < 0
    );
  }

  return (
    <Autocomplete
      multiple
      placeholder="Add label"
      options={defaultlabels}
      onChange={(_, value) => {
        dispatch(addLabel(value));
        toast.success(`Label added`);
      }}
      variant="soft"
      size="sm"
      limitTags={2}
      sx={{ mt: 1, paddingLeft: 1, paddingRight: 1 }}
      getOptionLabel={(option) => option.name}
      renderTags={(tags, getTagProps) =>
        tags.map((item, index) => (
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
        ))
      }
    />
  );
}
