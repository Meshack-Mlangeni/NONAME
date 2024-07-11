import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Sheet,
  Stack,
} from "@mui/joy";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../app/store/store";

import { FieldValues, useForm } from "react-hook-form";
import { loginAsync } from "../../../../account/accountSlice";
import AppLogo from "../../../../../../app/navbar/AppLogo";
import { Diversity1Rounded, EmailRounded } from "@mui/icons-material";

export default function Bio() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onTouched" });
  const onLoginSubmit = async (data: FieldValues) => {
    await dispatch(loginAsync(data));
  };
  return (
    <Card
      sx={{
        maxWidth: "100%",
      }}
    >
      <CardContent sx={{ justifyContent: "center", textAlign: "center" }}>
        {user ? (
          <>
            <Avatar sx={{ "--Avatar-size": "4rem", mx: "auto" }} />
            <Typography level="h4">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Link
              sx={{ fontWeight: "md", alignSelf: "center" }}
              href={`mailto:${user.email}`}
              color="neutral"
              level="body-sm"
            >
              <EmailRounded /> &nbsp; {user.email}
            </Link>
            <Typography sx={{ mt: 2, mb: 2 }} level="body-sm">
              {user.bio}
            </Typography>
            <Sheet
              sx={{
                bgcolor: "background.level1",
                borderRadius: "sm",
                p: 1.5,
                mt: 1,
                display: "flex",
                gap: 2,
                "& > div": { flex: 1 },
              }}
            >
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Posts
                </Typography>
                <Typography fontWeight="lg">00</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Groups
                </Typography>
                <Typography fontWeight="lg">00</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Rating
                </Typography>
                <Typography fontWeight="lg">0.0</Typography>
              </div>
            </Sheet>
          </>
        ) : (
          <>
            <AppLogo />
            <Typography sx={{ mt: 2, mb: 2 }} level="body-lg">
              Please sign in to your account to access all the app rich features
            </Typography>

            <Stack gap={4} sx={{ m: 2 }}>
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
                      {...register("rememberMe")}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
