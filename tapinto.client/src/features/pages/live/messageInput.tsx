import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import { Input } from "@mui/joy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
};

export default function MessageInput(props: MessageInputProps) {
  const { textAreaValue, setTextAreaValue, onSubmit } = props;
  //const textAreaRef = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== "") {
      onSubmit();
      setTextAreaValue("");
    }
  };
  return (
    <Box
      position={"fixed"}
      sx={{
        "--Input-radius": "8px",
        "--Input-placeholderOpacity": 0.5,
        "--Input-minHeight": "163px",
        "--Input-paddingInline": "32px",
        boxShadow: "lg",
        borderRadius: "sm",
        "--Input-decoratorChildHeight": "36px",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <FormControl>
        <Input
          sx={{ height: 64, pr: 4, ps: 4 }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          endDecorator={
            <Button size="lg" onClick={handleClick} endDecorator={<SendRoundedIcon />}>
              Send
            </Button>
          }
          placeholder="What's your opinion..."
          autoFocus
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
        />
      </FormControl>
    </Box>
  );
}
