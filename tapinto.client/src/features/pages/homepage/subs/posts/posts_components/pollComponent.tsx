import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Radio,
  FormLabel,
  Input,
  RadioGroup,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

interface Answer {
  questionId: number;
  value: string;
  isAnswer: boolean;
}

export default function PollComponent() {
  const [pollAnswer, setPollAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAddAnswer = (questionText: string) => {
    setAnswers((prev) => [
      ...prev,
      { questionId: prev.length + 1, value: questionText, isAnswer: false },
    ]);
    setPollAnswer("");
  };

  return (
    <>
      <Typography level="title-md">
        Answers (Please select default answer):{" "}
      </Typography>
      <Input
        color="neutral"
        value={pollAnswer}
        placeholder="Please type possible poll answer"
        endDecorator={
          <Button
            disabled={
              !pollAnswer ||
              answers.map((x) => x.value).indexOf(pollAnswer) !== -1
            }
            onClick={() => handleAddAnswer(pollAnswer)}
            startDecorator={<Add />}
          >
            Add Poll Answer
          </Button>
        }
        sx={{ mt: 1, width: "100%" }}
        onChange={(e) => setPollAnswer(e.target.value)}
      />

      {answers.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <RadioGroup size="sm" name="Poll" sx={{ gap: 1.5, mt: 2, mb: 2 }}>
            {answers.map((value) => (
              <Sheet
                key={value.questionId}
                sx={{
                  p: 2,
                  borderRadius: "md",
                  boxShadow: "sm",
                }}
              >
                <Radio
                  label={value.value}
                  overlay
                  name="Poll"
                  disableIcon
                  value={value.questionId}
                  slotProps={{
                    label: ({ checked }) => ({
                      sx: {
                        fontWeight: "lg",
                        fontSize: "md",
                        color: checked ? "text.primary" : "text.secondary",
                      },
                    }),
                    action: ({ checked }) => ({
                      sx: (theme) => ({
                        ...(checked && {
                          "--variant-borderWidth": "2px",
                          "&&": {
                            // && to increase the specificity to win the base :hover styles
                            borderColor: theme.vars.palette.primary[500],
                          },
                        }),
                      }),
                    }),
                  }}
                />
              </Sheet>
            ))}
          </RadioGroup>
        </Box>
      )}
    </>
  );
}
