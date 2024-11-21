import {
  Box,
  Button,
  Divider,
  Sheet,
  Textarea,
  Typography,
  Input,
} from "@mui/joy";
import { Add, JoinFullTwoTone, LoginTwoTone, Send } from "@mui/icons-material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../app/store/store";
import { createActivityAsync, getallActivityAsync } from "../activitySlice";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import ShowTo from "./activityVisibilityComponent";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import {
  CommentRounded,
  PollRounded,
  PostAddRounded,
} from "@mui/icons-material";
import Theme from "../../../../../../app/theme/theme";
import { Answer } from "../../../../../../models/answers";
import { useNavigate } from "react-router-dom";
import UpLoadFileButton from "./uploadfilebutton";
import { _ActivityType } from "./_ActivityType";

export default function ActivityTextField() {
  //Poll Start
  const navigate = useNavigate();
  const [pollAnswer, setPollAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAddAnswer = (questionText: string) => {
    setAnswers((prev) => [
      ...prev,
      {
        answerId: prev.length + 1,
        answer: questionText,
        isAnswer: false,
        activityId: 0,
      },
    ]);
    setPollAnswer("");
  };

  //PollEnd

  const { user } = useAppSelector((state) => state.account);

  const Mobile = useMediaQuery("(min-width:600px)");
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm({
    mode: "onTouched",
  });

  // eslint-disable-next-line no-empty-pattern
  const {} = useFieldArray({
    name: "pans",
    control,
  });
  const onSubmit = (data: FieldValues) => {
    console.log("data in PRFC: ", data);
    const formData = new FormData();
    formData.append("File", data.file);
    console.log(data);
    dispatch(
      createActivityAsync({
        ...data,
        answers: answers,
      } as FieldValues)
    )
      .finally(() => {
        setAnswers([]);
        control._reset();
        reset();
      })
      .then(() => {
        dispatch(getallActivityAsync(5));
      });
  };

  const [defaultValue, setDefaultValue] = useState<number>(0);
  const [submitBtnText, setSubmitBtnText] = useState<string>("Create Activity");
  const [pollValid, setPollValid] = useState<boolean>(false);
  const data = [
    ["Activity", <PostAddRounded />],
    ["Discussion", <CommentRounded />],
    ["Poll", <PollRounded />],
  ];

  const activityTFComponent = (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              setSubmitBtnText(
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
                {...register("activityType", {
                  required: true,
                  onChange: (e) => setDefaultValue(+e.target.defaultValue),
                })}
                color="neutral"
                value={(() => {
                  if (item[0] === "Activity") return 0 as _ActivityType;
                  else if (item[0] === "Discussion") return 1 as _ActivityType;
                  else return 2 as _ActivityType;
                })()}
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
        <Box display="flex" alignItems="center">
          {submitBtnText.toLowerCase().includes("poll") ? (
            <Sheet
              variant="soft"
              color="neutral"
              sx={(theme) => ({
                p: 2,
                width: "100%",
                borderRadius: "sm",
                border: `2px ${
                  theme.palette.mode === "dark"
                    ? theme.palette.neutral[700]
                    : theme.palette.neutral[300]
                } dashed`,
              })}
            >
              <Textarea
                placeholder={"Please type poll question..."}
                minRows={1}
                maxRows={4}
                {...register("postContent", {
                  required: "Cannot send an empty post",
                  onChange: () => {
                    console.log("Is Poll Valid: ", pollValid);
                  },
                })}
                sx={{
                  minWidth: 300,
                  width: "100%",
                  mb: 3,
                }}
              />

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
                        answers.map((x) => x.answer).indexOf(pollAnswer) !== -1
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

                {answers && answers.length > 0 && (
                  <Box sx={{ width: "100%" }}>
                    <RadioGroup
                      size="sm"
                      name="Poll"
                      sx={{ gap: 1.5, mt: 2, mb: 2 }}
                    >
                      {answers.map((value, index) => (
                        <Sheet
                          key={index}
                          sx={{
                            p: 2,
                            borderRadius: "md",
                            boxShadow: "sm",
                          }}
                        >
                          <Radio
                            label={value.answer}
                            overlay
                            disableIcon
                            value={index}
                            onChange={() => {
                              answers.forEach((ans) => {
                                setPollValid(true);
                                if (ans.answerId !== index + 1)
                                  ans.isAnswer = false;
                                else ans.isAnswer = true;
                              });
                            }}
                            slotProps={{
                              label: ({ checked }) => ({
                                sx: {
                                  fontWeight: "lg",
                                  fontSize: "md",
                                  color: checked
                                    ? "text.primary"
                                    : "text.secondary",
                                },
                              }),
                              action: ({ checked }) => ({
                                sx: (theme) => ({
                                  ...(checked && {
                                    "--variant-borderWidth": "2px",
                                    "&&": {
                                      // && to increase the specificity to win the base :hover styles
                                      borderColor:
                                        theme.vars.palette.primary[500],
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
            </Sheet>
          ) : (
            <>
              <Textarea
                placeholder={"What's on your mind..."}
                minRows={1}
                maxRows={4}
                {...register("activityContent", {
                  required: "Cannot send an empty activity",
                })}
                sx={{
                  minWidth: 300,
                  width: "100%",
                }}
              />
            </>
          )}
        </Box>
        <Box sx={{ mt: 3 }} display="flex" alignItems="center">
          <>
            <Button
              disabled={(() => {
                if (submitBtnText.toLowerCase().includes("poll"))
                  return !(isValid && pollValid);
                else return !isValid;
              })()}
              type="submit"
              size="sm"
              sx={{ mr: 1 }}
              variant="solid"
            >
              <Send /> &nbsp; {submitBtnText}
            </Button>
            <UpLoadFileButton control={control} />
          </>
          {Mobile && <br />}
          <>
            <Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />
            <ShowTo register={register} />
          </>
        </Box>
      </form>
    </>
  );

  return !user
    ? checkUserAndGroups(
        <LoginTwoTone />,
        "You have to sign in to post something"
      )
    : user.groups && user.groups.length > 0
    ? activityTFComponent
    : checkUserAndGroups(
        <JoinFullTwoTone />,
        "Please join atleast one group in your school",
        <>
          <Button sx={{ m: 1 }} onClick={() => navigate("/home/groups")}>
            Go To Groups
          </Button>
        </>
      );
}

function checkUserAndGroups(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: any,
  text: string,
  children?: React.ReactNode
) {
  return (
    <Typography level="body-lg">
      {img}&nbsp;&nbsp;&nbsp;{text} &nbsp;&nbsp; {children}
    </Typography>
  );
}
