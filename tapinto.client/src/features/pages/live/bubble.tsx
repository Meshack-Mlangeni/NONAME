import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Chats } from "../../../models/chats";
import convertToDateTimeAgo from "../../../helpers/convertToDateTimeAgo";

type BubbleProps = {
  variant: "sent" | "received";
  chat: Chats;
  isYou: boolean;
};

export default function Bubble(props: BubbleProps) {
  const { variant, chat, isYou } = props;
  const isSent = variant === "sent";
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography fontWeight={700} level="body-xs">
          {isYou ? "Me" : chat.fullNames}
        </Typography>
        <Typography level="body-xs">
          {convertToDateTimeAgo(chat.timeStamp)}
        </Typography>
      </Stack>
      <Box sx={{ position: "relative" }}>
        <Sheet
          color={isSent ? "primary" : "neutral"}
          variant={isSent ? "solid" : "soft"}
          sx={{
            p: 1.25,
            borderRadius: "lg",
            borderTopRightRadius: isSent ? 0 : "lg",
            borderTopLeftRadius: isSent ? "lg" : 0,
            backgroundColor: isSent
              ? "var(--joy-palette-primary-solidBg)"
              : "#D9DADA",
          }}
        >
          <Typography
            level="title-lg"
            sx={{
              color: isSent
                ? "var(--joy-palette-common-white)"
                : "var(--joy-palette-common-black)",
            }}
          >
            {chat.content}
          </Typography>
        </Sheet>
      </Box>
    </Box>
  );
}
