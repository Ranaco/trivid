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
import { useRouter } from "next/router";
import { IoMdSend } from "react-icons/io";
import { Player as PeerPlayer } from "@livepeer/react";
import { useReadDB } from "../../lib/hooks/useTableland";
import { LivepeerStream, TriUser } from "../../lib/types";

const Player = () => {
  const theme = useTheme();
  const router = useRouter();

  const id = router.query.id;
  const [user, setUser] = React.useState<TriUser[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    const results: TriUser[] = await useReadDB({ params: ["*"] });
    const streams: LivepeerStream[] = results.map((e) => e.stream);

    const stream: LivepeerStream = streams.filter(
      (e) => e.playbackId === id
    )[0];

    if (stream) {
      const address = stream.address;

      const userData: TriUser[] = await useReadDB({
        params: ["*"],
        qColumn: "id",
        qVal: String(address).substring(0, 10),
      });
      console.log("This is from the usepage", userData);
      if (userData) {
        setUser(userData);
        setLoading(false);
      }
    }

    console.log(streams);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <Box
      height={"calc(100vh - 50px)"}
      width={"100vw"}
      display="flex"
      justifySelf={"center"}
      alignItems="center"
    />
  ) : (
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
        <Box zIndex={0}>
          <PeerPlayer
            playbackId={user[0].stream ? user[0].stream.playbackId : undefined}
            autoPlay
            loop
            aspectRatio={"16to9"}
          />
        </Box>
        <Stack width="100%" ml={"20px"} pt={"10px"}>
          <Typography fontSize={"1.4em"} fontFamily="sans-serif">
            {user[0].stream.title}
          </Typography>
          <Stack gap="20px" direction="row" pt="10px">
            <Avatar src={user[0].profile} />
            <Stack direction={"column"}>
              <Typography variant="caption" fontWeight={"bold"}>
                {user[0].name}
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
