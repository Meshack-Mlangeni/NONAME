import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { NavLink } from "react-router-dom";
import {
  Chip,
  Divider,
  FormHelperText,
  Autocomplete,
  RadioGroup,
  Radio,
  Switch,
  useColorScheme,
  Sheet,
} from "@mui/joy";
import { FieldValues, useForm } from "react-hook-form";
import { DarkMode, LightMode, WarningAmberRounded } from "@mui/icons-material";
import AppLogo from "../../../app/navbar/AppLogo";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { registerAsync } from "./accountSlice";
import { setLoading } from "../../../app/store/appSlice";
import { getallActivityAsync } from "../homepage/subs/activity/activitySlice";
import { useEffect, useState } from "react";
import MyCamera from "./takeImage";
import { getAllSchoolsAsync } from "../homepage/subs/myschool/schoolSlice";
//generously borrowed from MUI sign up template

export default function Register() {
  const dispatch = useAppDispatch();
  const { schools } = useAppSelector((state) => state.school);
  //let getSchoolNames = schools.map((s) => s.schoolName);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });
  const onRegisterSubmit = async (data: FieldValues) => {
    dispatch(setLoading(true));
    await dispatch(registerAsync(data)).then(
      async (data) => data && (await dispatch(getallActivityAsync(5)))
    );
    dispatch(setLoading(false));
  };
  const { mode, setMode } = useColorScheme();
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string>("");

  useEffect(() => {
    if (!schools || schools === undefined) {
      dispatch(getAllSchoolsAsync());
    }
  }, [dispatch, schools]);

  return (
    <Sheet>
      <Box
        sx={{
          width: { xs: "100%", md: "50vw" },
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(16px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <AppLogo /> &nbsp;
              <Button component={NavLink} to="/home/posts">
                Guest mode
              </Button>
              <Switch
                size="lg"
                onChange={() => setMode(mode === "light" ? "dark" : "light")}
                slotProps={{
                  input: { "aria-label": "Dark mode" },
                  thumb: {
                    children: mode === "light" ? <LightMode /> : <DarkMode />,
                  },
                }}
                sx={{
                  "--Switch-thumbSize": "16px",
                }}
              />
            </Box>
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
            }}
          >
            <Stack gap={4} sx={{ mb: 1 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h2">
                  Create an account
                </Typography>
                <Typography level="body-sm">
                  Already have an account?{" "}
                  <Link component={NavLink} to={"/login"} level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={4} sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onRegisterSubmit)}>
                <FormControl sx={{ mb: 2 }} error={!!errors.registeras}>
                  <FormLabel>Register As</FormLabel>
                  <RadioGroup
                    {...register("registeras", {
                      required: true,
                      onChange: (event) =>
                        setIsTeacher(
                          (event?.target?.value as string).toLowerCase() ===
                            "teacher"
                        ),
                    })}
                    orientation="horizontal"
                  >
                    <Radio
                      value="Student"
                      {...register("registeras")}
                      label="Student"
                    />
                    <Radio
                      value="Teacher"
                      {...register("registeras")}
                      label="Teacher"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl error={!!errors.firstname}>
                  <FormLabel>First name</FormLabel>
                  <Input
                    type="text"
                    placeholder={errors.firstname?.message as string}
                    {...register("firstname", {
                      required: "Please enter first name",
                    })}
                  />
                </FormControl>

                <FormControl error={!!errors.lastname}>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    type="text"
                    placeholder={errors.lastname?.message as string}
                    {...register("lastname", {
                      required: "Please enter last name",
                    })}
                  />
                </FormControl>

                <FormControl error={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder={errors.email?.message as string}
                    {...register("email", {
                      required: "Please enter valid email",
                      pattern:
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    })}
                  />
                </FormControl>

                <FormControl error={!!errors.schoolName}>
                  <FormLabel>School name</FormLabel>
                  <Autocomplete
                    options={schools
                      .map((s) => s.schoolName)
                      .sort((a, b) => -b.localeCompare(a))}
                    groupBy={(schools) => schools[0]}
                    freeSolo
                    placeholder={errors.schoolName?.message as string}
                    {...register("schoolName", {
                      required: "Please select school",
                    })}
                  />
                  <FormHelperText sx={{ fontWeight: "500" }}>
                    School not showing? Type it in, it will be approved by
                    Administrators if its valid.
                  </FormHelperText>
                </FormControl>

                {isTeacher && (
                  <Sheet
                    variant="soft"
                    color="neutral"
                    sx={(theme) => ({
                      p: 2,
                      mt: 2,
                      mb: 2,
                      borderRadius: "sm",
                      border: `2px ${
                        theme.palette.mode === "dark"
                          ? imageData
                            ? theme.palette.success[700]
                            : theme.palette.neutral[700]
                          : imageData
                          ? theme.palette.success[300]
                          : theme.palette.neutral[300]
                      } dashed`,
                    })}
                  >
                    <FormLabel sx={{ mb: 2, fontWeight: 600 }}>
                      <img
                        width={24}
                        height={24}
                        alt="SACE Logo"
                        src="../_sace.png"
                      />
                      &nbsp;Upload SACE for Verification ({"<"} 72 hours)
                    </FormLabel>
                    <Box sx={{ m: 1 }}>
                      <FormControl error={!!errors.imageData}>
                        <Input
                          type="text"
                          placeholder={
                            (errors.imageData?.message as string) ??
                            "Image Data"
                          }
                          value={imageData}
                          endDecorator={
                            <MyCamera imageData={[imageData, setImageData]} />
                          }
                          readOnly
                          {...register("imageData", {
                            required: "Please upload SACE",
                          })}
                        />
                      </FormControl>
                    </Box>
                    <FormHelperText sx={{ mt: 2 }}>
                      <WarningAmberRounded />
                      <Typography level="body-sm">
                        Your Sensitive Files Are Treated with Utmost Secrecy.
                      </Typography>
                    </FormHelperText>
                  </Sheet>
                )}

                <Divider sx={{ mt: 3, mb: 1 }}>
                  <Chip variant="soft" color="neutral" size="sm">
                    Secure your account
                  </Chip>
                </Divider>

                <FormControl error={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder={errors.password?.message as string}
                    {...register("password", {
                      required: "Please enter password",
                    })}
                  />
                </FormControl>
                <FormControl error={!!errors.confirmPassword}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder={errors.confirmPassword?.message as string}
                    {...register("confirmPassword", {
                      required: "Please re-enter password",
                    })}
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button
                    loading={isSubmitting}
                    variant="solid"
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                  >
                    Create account
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              ©NONAME {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        className="account-img"
        sx={{
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "auto",
        }}
      />
    </Sheet>
  );
}
