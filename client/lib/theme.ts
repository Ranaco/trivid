import { createTheme } from "@mui/material";
import { Righteous, M_PLUS_Rounded_1c } from "next/font/google";

export const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  display: "auto",
});

const theme = createTheme({
  typography: {
    fontFamily: righteous.style.fontFamily,
    allVariants: {
      color: "#d8dee9",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {},
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "caption" },
          style: {
            fontFamily: "sans-serif",
          },
        },
      ],
    },
  },
  breakpoints: {
    values: {
      sm: 680,
      xs: 0,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#0d0d0f",
      dark: "#e473ff",
      light: "#D8DEE9",
      "600": "rgba(13, 13, 15, 0.14)",
      "700": "#242933",
      "800": "rgba(36, 41, 51, 0.7)",
      "100": "rgba(216, 222, 233, 0.1)",
    },
    secondary: {
      main: "#1c1d1f",
      light: "#f20e89",
    },
  },
});

export default theme;
