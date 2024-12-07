import { Button, CircularProgress, Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import { Answer } from "../../../../../../models/answers";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../../../app/store/store";
import { useState } from "react";
import { submitPollAnswerAsync } from "../activitySlice";

interface IPopQuiz {
  activityId: number;
  question: string;
  answers: Answer[];
}

export default function PopQuizComponent({
  question,
  answers,
  activityId,
}: IPopQuiz) {
  const {
    handleSubmit,
    register,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "all",
  });
  console.log("This is the pop question: ", question);
  console.log("This is the pop ansers: ", answers);
  const dispatch = useAppDispatch();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<{
    isAnswer: boolean;
    correctAnswer?: string;
  } | null>(null);

  const onAnswerSubmit = async (data: FieldValues) => {
    data = { ...data, activityId: activityId };
    const response = (await dispatch(submitPollAnswerAsync(data)).unwrap())
      .data;
    setIsAnswerCorrect({
      isAnswer: response?.chosenAnswerCorrect as boolean,
      correctAnswer: response?.selectedAnswer,
    });
    console.log("This is the answr you chose: ", data);
  };

  return !isSubmitting ? (
    <Box>
      {isAnswerCorrect && isAnswerCorrect.isAnswer ? (
        <FormLabel
          sx={{
            mb: 2,
            fontWeight: "md",
            fontSize: "md",
            textJustify: "auto",
            textAlign: "justify",
          }}
        >
          Kudos!, you are{" "}
          <Typography fontWeight={900} textColor={"success.500"}>
            right
          </Typography>
          , the answer to <strong>"{question}"</strong> was{" "}
          {isAnswerCorrect.correctAnswer}. This will add up to your rating!
        </FormLabel>
      ) : isAnswerCorrect && !isAnswerCorrect.isAnswer ? (
        <FormLabel
          sx={{
            mb: 2,
            fontWeight: "md",
            fontSize: "md",
            textJustify: "auto",
            textAlign: "justify",
          }}
        >
          Oh no!, you got it{" "}
          <Typography fontWeight={900} textColor={"danger.500"}>
            wrong
          </Typography>
          , the answer to <strong>"{question}"</strong> was{" "}
          {isAnswerCorrect.correctAnswer}. Chin up, you will get it right next
          time!
        </FormLabel>
      ) : (
        <form onSubmit={handleSubmit(onAnswerSubmit)}>
          <FormLabel
            sx={{
              mb: 2,
              fontWeight: "md",
              fontSize: "md",
            }}
          >
            {question}
          </FormLabel>
          <RadioGroup size="sm" sx={{ gap: 1.5 }}>
            {answers &&
              answers.map((value, index) => (
                <Sheet
                  key={+index}
                  sx={{
                    p: 2,
                    borderRadius: "md",
                  }}
                >
                  <Radio
                    label={value.answer}
                    overlay
                    disableIcon
                    {...register("selectedAnswer", { required: true })}
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
            <Button loading={isSubmitting} disabled={!isValid} type="submit">
              Submit Answer
            </Button>
          </RadioGroup>
        </form>
      )}
    </Box>
  ) : (
    <Box>
      <CircularProgress />
    </Box>
  );
}
