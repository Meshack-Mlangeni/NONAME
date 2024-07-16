import { extendTheme } from "@mui/joy";

const Theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {
        "primary": {
          "50": "#ede7f6",
          "100": "#d1c4e9",
          "200": "#b39ddb",
          "300": "#9575cd",
          "400": "#7e57c2",
          "500": "#673ab7",
          "600": "#5e35b1",
          "700": "#512da8",
          "800": "#4527a0",
          "900": "#311b92"
        },
        "background": {
          "body": "#F0F0F0"
        }
      }
    },
    "dark": {
      "palette": {
        "primary": {
          "50": "#ede7f6",
          "100": "#d1c4e9",
          "200": "#b39ddb",
          "300": "#9575cd",
          "400": "#7e57c2",
          "500": "#673ab7",
          "600": "#5e35b1",
          "700": "#512da8",
          "800": "#4527a0",
          "900": "#311b92"
        },
        "background": {
          "body": "#171717"
        }
      }
    }
  }
});

export default Theme;