import * as React from "react";
import { Box, Stack, useTheme } from "@mui/material";
import { Router } from "next/router";
import Head from "next/head";
import NavBar from "../navbar";
import SideBar from "../sidebar";
import { Global } from "@emotion/react";

export const ScrollBarStyle = () => {
  return (
    <Global
      styles={`
      ::-webkit-scrollbar {
        width: 10px;
        height: 7px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #28343E;
        border-radius: 2px;
      }
      `}
    />
  );
};

interface MainProps {
  children: React.ReactNode;
  router: Router;
}

const Main: React.FC<MainProps> = ({ children, router }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, #2E3440, #BF616A)`,
          backdropFilter: "blur(30px)",
          zIndex: "-1",
        },
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ranaco" />
        <title>Trivid</title>
      </Head>
      <Stack>
        <NavBar />
        <Stack
          direction={"row"}
          sx={{
            overflowX: "hidden",
          }}
        >
          <SideBar
            router={router}
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          />
          <Box
            height={"calc(100vh - 50px)"}
            width={"100vw"}
            mt="40px"
            pl="50px"
            sx={{
              [theme.breakpoints.down("sm")]: {
                pl: "0px",
              },
            }}
          >
            {children}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Main;
