import { Button } from "@mui/joy";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import { Answer } from "../../../../../../models/answers";

interface IPopQuiz {
  question: string;
  answers: Answer[];
}

export default function PopQuizComponent({ question, answers }: IPopQuiz) {
  return (
    <Box>
      <FormLabel
        sx={{
          mb: 2,
          fontWeight: "md",
          fontSize: "md",
        }}
      >
        {question}
      </FormLabel>
      <RadioGroup
        size="sm"
        sx={{ gap: 1.5 }}
      >
        {answers.map((value, index) => (
          <Sheet
            key={value.id + index}
            sx={{
              p: 2,
              borderRadius: "md",
            }}
          >
            <Radio
              label={value.answer}
              overlay
              disableIcon
              value={value.answer}
              slotProps={{
                label: ({ checked }) => ({
                  sx: {
                    fontWeight: "xl",
                    fontSize: "sm",
                    color: checked ? "text.primary" : "text.secondary",
                  },
                }),
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      "--variant-borderWidth": "2px",
                      "&&": {
                        borderColor: theme.vars.palette.primary[500],
                      },
                    }),
                  }),
                }),
              }}
            />

          </Sheet>
        ))}
      <Button>Submit Answer</Button>
      </RadioGroup>
    </Box>
  );
}
