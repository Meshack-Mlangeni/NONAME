import { CssVarsProvider } from "@mui/joy";
import Theme from "./theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppThemeContextProvider = ({ children }: any) => {
  return (
    <CssVarsProvider defaultMode="dark" theme={Theme} disableTransitionOnChange>
      {children}
    </CssVarsProvider>
  );
};
