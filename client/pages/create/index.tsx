import * as React from "react";
import { Stack, useTheme, Box, Input, Button } from "@mui/material";
import { BsClipboard } from "react-icons/bs";
import ReadOnlyField from "../../components/readonly-field";
import { useCreateStream, Player } from "@livepeer/react";
import { LivepeerStream } from "../../lib/types";

const Create = () => {
  const theme = useTheme();
  const [stream, setStream] = React.useState<LivepeerStream>({
    id: "",
    title: "",
    description: "",
    link: "",
  });
  // const {
  //   mutate: createStream,
  //   data: streamData,
  //   status,
  //   isLoading,
  // } = useCreateStream(stream.title ? { name: stream.title } : null);

  const startStream = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) =>
    setStream((val) => ({
      ...val,
      [e.target.name]: e.target.value,
    }));

  return (
    <Stack gap="10px" height="100%" width={"100%"} p="15px" overflow="scroll">
      <Stack
        overflow={"scroll"}
        pt="20px"
        direction={"row"}
        sx={{
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
        borderRadius="10px"
        bgcolor={theme.palette.primary["800"]}
        gap="max(10%, 50px)"
        width="100%"
        height="40%"
      >
        <Box
          gap="30px"
          display={"flex"}
          flexDirection="column"
          pl="10px"
          sx={{
            width: "40%",
            [theme.breakpoints.down("md")]: {
              width: "50%",
            },
            [theme.breakpoints.down("sm")]: {
              width: "90%",
            },
          }}
        >
          <ReadOnlyField defaultValue="KK" label="RTMP Ingest URL" />
          <ReadOnlyField defaultValue="Something" label="SRT Ingest URL" />
          <ReadOnlyField defaultValue="Playback" label="Playback URL" />
        </Box>
        <Box
          sx={{
            width: "40%",
            [theme.breakpoints.down("md")]: {
              width: "50%",
            },
            [theme.breakpoints.down("sm")]: {
              width: "90%",
            },
          }}
        >
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Input
              placeholder="Title"
              fullWidth
              name="title"
              value={stream.title}
              onChange={onChange}
            />
            <Input
              placeholder="Description"
              fullWidth
              name="description"
              value={stream.description}
              onChange={onChange}
            />
            <Button>Create</Button>
          </form>
        </Box>
      </Stack>
      <Stack
        flex="1"
        borderRadius="10px"
        bgcolor={theme.palette.primary["800"]}
      ></Stack>
    </Stack>
  );
};

export default Create;
