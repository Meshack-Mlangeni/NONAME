import {
  CheckCircleOutlineRounded,
  ColorLensRounded,
  DarkMode,
  LightMode,
  Policy,
  RemoveCircleOutlined,
  SettingsAccessibilityRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  radioClasses,
  RadioGroup,
  Sheet,
  Typography,
  useColorScheme,
} from "@mui/joy";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MyCamera from "../account/takeImage";
import SubSection from "../../components/subSection";

export default function Settings() {
  const { mode, setMode } = useColorScheme();
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const [imageData, setImageData] = useState<string>("");

  return (
    <>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid xs={12}>
          <Card sx={{ ml: 5, mr: 5, mt: 2, p: 4, boxShadow: "sm" }}>
            <Typography level="h1" sx={{ fontWeight: "700" }}>
              <SettingsAccessibilityRounded
                style={{ marginTop: "-10px", marginRight: "8px" }}
              />
              Settings
            </Typography>
            <Typography level="title-md">
              Personalize how your application settings and features are
              displayed to suit your preferences.
            </Typography>
            <Divider />

            <SubSection
              hasDivider
              icon={
                <Policy style={{ marginTop: "-10px", marginRight: "8px" }} />
              }
              title="Roles"
              discr="Switch Between Roles"
              size="h4"
            >
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
                <Typography sx={{ pt: 1, pb: 2 }} level={"h4"}>
                  Do You Want To Apply For A Teacher Role?
                </Typography>
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
                        (errors.imageData?.message as string) ?? "Image Data"
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
                <Button sx={{ mt: 2, mb: 2 }}>Submit Application</Button>
              </Sheet>
            </SubSection>

            <SubSection
              hasDivider
              size={"h4"}
              icon={
                <ColorLensRounded
                  style={{ marginTop: "-10px", marginRight: "8px" }}
                />
              }
              title={"Theme"}
              discr={"Customise Your Application Look."}
            >
              <RadioGroup
                aria-label="platform"
                defaultValue="Website"
                overlay
                name="platform"
                sx={{
                  flexDirection: "row",
                  gap: 2,
                  [`& .${radioClasses.checked}`]: {
                    [`& .${radioClasses.action}`]: {
                      inset: -1,
                      border: "3px solid",
                      borderColor: "primary.500",
                    },
                  },
                  [`& .${radioClasses.radio}`]: {
                    display: "contents",
                    "& > svg": {
                      zIndex: 2,
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      bgcolor: "background.surface",
                      borderRadius: "50%",
                    },
                  },
                }}
              >
                {["Dark Mode", "Light Mode"].map((value) => (
                  <Sheet
                    key={value}
                    variant="outlined"
                    sx={{
                      borderRadius: "md",

                      boxShadow: "sm",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      minWidth: 120,
                    }}
                  >
                    <Radio
                      id={value}
                      value={value}
                      onChange={(e) =>
                        setMode(
                          e.target.value.split(" ")[0].toLowerCase() === "dark"
                            ? "dark"
                            : "light"
                        )
                      }
                      checked={mode === value.split(" ")[0].toLowerCase()}
                      checkedIcon={<CheckCircleOutlineRounded />}
                    />
                    {value.includes("Dark") ? <DarkMode /> : <LightMode />}
                    <FormLabel htmlFor={value}>{value}</FormLabel>
                  </Sheet>
                ))}
              </RadioGroup>
            </SubSection>

            <SubSection
              icon={
                <RemoveCircleOutlined
                  style={{ marginTop: "-10px", marginRight: "8px" }}
                />
              }
              hasDivider
              discr="Sorry To See You Go!"
              size="h4"
              title="Deactivate Account"
            ></SubSection>

            <Button size="sm" variant="outlined" sx={{ mt: 5 }} color="neutral">
              Cancel
            </Button>
            <Button size="sm" variant="solid">
              Save
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
