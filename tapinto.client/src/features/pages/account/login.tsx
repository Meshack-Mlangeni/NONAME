import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { NavLink } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/store/store";
import { loginAsync } from "./accountSlice";
import { Sheet, Switch, useColorScheme } from "@mui/joy";
import { DarkMode, LightMode } from "@mui/icons-material";
//generously borrowed from MUI sign up template

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onTouched" });
  const dispatch = useAppDispatch();

  const onLoginSubmit = async (data: FieldValues) => {
    dispatch(loginAsync(data));
  };
  const { mode, setMode } = useColorScheme();
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
              <Typography level="h3">NONAME YET</Typography> &nbsp;
              <Button component={NavLink} to="/home">
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
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h2">
                  Login to your account
                </Typography>
                <Typography level="body-sm">
                  Don't have an account?{" "}
                  <Link component={NavLink} to={"/register"} level="title-sm">
                    Sign up!
                  </Link>
                </Typography>
              </Stack>
            </Stack>

            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit(onLoginSubmit)}>
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
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      size="sm"
                      label="Remember me"
                      {...register("rememberMe", {})}
                    />
                    <Link level="title-sm" href="#replace-with-a-link">
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button
                    loading={isSubmitting}
                    variant="solid"
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                  >
                    Sign in
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
