import { Typography, Box, Stack, useTheme } from "@mui/material";
import * as React from "react";
import { Video } from "./styled-components";

const TrendingComponent = () => {
  const theme = useTheme();

  return (
    <Stack
      maxWidth={"calc(100vw - 50px)"}
      direction="row"
      p="30px"
      height="40%"
      sx={{
        [theme.breakpoints.down("md")]: {
          width: "100vw",
          p: "15px",
          justifyContent: "center",
          ml: "auto",
          mr: "auto",
        },
        [theme.breakpoints.down("sm")]: {
          p: "5px",
          maxWidth: "100vw",
        },
      }}
      overflow="hidden"
      maxHeight={"450px"}
    >
      <Box
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
        width="50%"
        overflow={"hidden"}
      >
        <Typography fontSize={"4.3em"}>
          {"play, compete, follow popular streamers".toUpperCase()}
        </Typography>
        <Typography>
          Watch, Create and capture moments you love{" "}
          <span
            style={{
              color: "red",
            }}
          >
            &hearts;
          </span>{" "}
          as NFT's with your friends
        </Typography>
      </Box>
      <Box
        maxHeight={"400px"}
        minHeight="300px"
        sx={{
          width: "50%",
          [theme.breakpoints.down("md")]: {
            width: "90%",
          },
        }}
        p={"20px"}
      >
        <Box
          height={"100%"}
          bgcolor={theme.palette.secondary.main}
          borderRadius="20px"
        >
          <Video
            loop
            src="/videos/home.mp4"
            autoPlay
            muted
            sx={{
              height: "100%",
              width: "100%",
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default TrendingComponent;
