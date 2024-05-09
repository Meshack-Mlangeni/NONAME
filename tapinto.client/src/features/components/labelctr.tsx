/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Close } from "@mui/icons-material";
import { Autocomplete, Chip } from "@mui/joy";

export default function Labels() {
  const labels = [
    { name: "Question", color: "success" },
    { name: "Need Help", color: "danger" },
    { name: "Suggestion", color: "warning" },
  ];

  return (
    <Autocomplete
      multiple
      placeholder="Add label"
      options={labels}
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
