import * as React from "react";
import {
  Avatar,
  Paper,
  Box,
  Chip,
  Stack,
  Typography,
  useTheme,
  TextField,
  IconButton,
} from "@mui/material";
import { Video } from "../../components/styled-components";
import { useRouter } from "next/router";
import { IoMdSend } from "react-icons/io";

const Player = () => {
  const theme = useTheme();
  const router = useRouter();

  const id = router.query.id;

  return (
    <Stack
      gap={"20px"}
      direction={"row"}
      sx={{
        overflowX: "hidden",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          gap: "0px",
        },
      }}
    >
      <Stack
        alignItems="center"
        width={"calc(65vw - 45px)"}
        mt={"20px"}
        height={"calc(100vh - 60px)"}
        borderRadius="10px"
        sx={{
          [theme.breakpoints.down("md")]: {
            width: "calc(100vw - 45px)",
          },
          [theme.breakpoints.down("sm")]: {
            width: "100vw",
          },
        }}
      >
        <Video
          autoPlay
          controls
          sx={{
            aspectRatio: "16/9",
            flex: "1",
          }}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            type="video/mp4"
          />
        </Video>
        <Stack width="100%" ml={"20px"} pt={"10px"}>
          <Typography fontSize={"1.4em"} fontFamily="sans-serif">
            1000 miles of Sebring stream with Golden Mike - 2022
          </Typography>
          <Stack gap="20px" direction="row" pt="10px">
            <Avatar src="https://picsum.photos/300" />
            <Stack direction={"column"}>
              <Typography variant="caption" fontWeight={"bold"}>
                Mike Thorsey
                <Chip
                  onClick={() => {
                    console.log("hello");
                  }}
                  clickable
                  label="Subscribe"
                  variant="outlined"
                  style={{ fontFamily: "sans-serif", marginLeft: "40px" }}
                />
              </Typography>
              <Typography variant="caption" color={"grey"}>
                143k subscribers
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack height={"200px"} width="95%">
          <Box width={"100%"} mt={"30px"}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Enter your comment here..."
                multiline
                variant="standard"
                sx={{
                  width: "90%",
                  pl: "10px",
                }}
              />
              <IconButton>
                <IoMdSend />
              </IconButton>
            </Paper>
          </Box>
        </Stack>
      </Stack>
      <Box
        sx={{
          [theme.breakpoints.down("md")]: {
            width: "calc(100vw - 50px)",
          },
        }}
        width={"calc(35vw - 25px)"}
        maxHeight={"100vh"}
        bgcolor="grey"
      ></Box>
    </Stack>
  );
};

export default Player;
