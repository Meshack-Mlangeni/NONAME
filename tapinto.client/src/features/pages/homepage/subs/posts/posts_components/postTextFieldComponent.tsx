/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Box,
  Button,
  Chip,
  ChipDelete,
  Divider,
  IconButton,
  Sheet,
  Textarea,
  Typography,
  Input,
} from "@mui/joy";
import Labels from "../../../../../components/labelctr";
import {
  Add,
  AttachFileOutlined,
  LoginTwoTone,
  PhotoCameraOutlined,
  Send,
} from "@mui/icons-material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../app/store/store";
import {
  createActivityAsync,
  getallActivityAsync,
  getLabelsAsync,
  removeLabel,
  resetLabels,
} from "../postSlice";
import { toast } from "react-toastify";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import ShowTo from "./postVisibilityComponent";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from "react";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { PostType } from "../../../../../../models/posttype";
import {
  CommentRounded,
  PollRounded,
  PostAddRounded,
} from "@mui/icons-material";
import Theme from "../../../../../../app/theme/theme";
import { Answer } from "../../../../../../models/answers";

export default function PostTextField() {
  //Poll Start

  const [pollAnswer, setPollAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAddAnswer = (questionText: string) => {
    setAnswers((prev) => [
      ...prev,
      { id: prev.length + 1, answer: questionText, isAnswer: false, postId: 0 },
    ]);
    setPollAnswer("");
  };

  //PollEnd

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file.name);
    }
  };

  const { user } = useAppSelector((state) => state.account);

  const Mobile = useMediaQuery("(min-width:600px)");
  const dispatch = useAppDispatch();
  const { selectedLabels } = useAppSelector((state) => state.posts);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm({
    mode: "onTouched",
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "pans",
    control,
  });
  const onSubmit = (data: FieldValues) => {
    dispatch(createActivityAsync(data))
      .finally(() => {
        setAnswers([]);
        dispatch(resetLabels());
        reset();
      })
      .then(() => {
        dispatch(getallActivityAsync());
      });
  };

  useEffect(() => {
    dispatch(getLabelsAsync());
  }, [dispatch]);
  const [defaultValue, setDefaultValue] = useState<number>(0);
  const [submitBtnText, setSubmitBtnText] = useState<string>("Create Post");
  const [pollValid, setPollValid] = useState<boolean>(false);
  const data = [
    ["Post", <PostAddRounded />],
    ["Poll", <PollRounded />],
    ["Discussion", <CommentRounded />],
  ];
  return user ? (
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
                {...register("postType", {
                  required: true,
                  onChange: (e) => setDefaultValue(+e.target.defaultValue),
                })}
                color="neutral"
                value={
                  item[0] === "Post"
                    ? (0 as PostType)
                    : item[0] === "Poll"
                    ? (1 as PostType)
                    : (2 as PostType)
                }
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
                startDecorator={
                  submitBtnText.toLowerCase().includes("post") && (
                    <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                      <Labels />
                      <>
                        {selectedLabels.map((lbl, idx) => (
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
                  )
                }
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

                {answers.length > 0 && (
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
                                if (ans.id !== index + 1) ans.isAnswer = false;
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
            <Textarea
              placeholder={"What's on your mind..."}
              minRows={1}
              maxRows={4}
              {...register("postContent", {
                required: "Cannot send an empty post",
              })}
              startDecorator={
                submitBtnText.toLowerCase().includes("post") && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      flex: 1,
                      maxHeight: 42,
                      overflowX: "auto",
                    }}
                  >
                    <Box>
                      <label>
                        <IconButton size="sm" color="warning">
                          <AttachFileOutlined />
                        </IconButton>
                      </label>
                      <label>
                        <IconButton size="sm" color="success">
                          <PhotoCameraOutlined />
                        </IconButton>
                      </label>
                    </Box>
                    <Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />
                    <Labels />
                    <>
                      {selectedLabels.map((lbl, idx) => (
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
                )
              }
              sx={{
                minWidth: 300,
                width: "100%",
              }}
            />
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
          </>
          {Mobile && <br />}
          <>
            <Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />
            <ShowTo register={register} />
          </>
        </Box>
      </form>
    </>
  ) : (
    <Typography level="body-lg">
      <LoginTwoTone /> &nbsp;&nbsp;&nbsp; You have to sign in to post something
    </Typography>
  );
}
