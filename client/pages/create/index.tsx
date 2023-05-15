import * as React from "react";
import { Stack, useTheme, Box, Input, Button } from "@mui/material";
import ReadOnlyField from "../../components/readonly-field";
import { useCreateStream, Player } from "@livepeer/react";
import { AppState } from "../_app";
import {
  useDeleteDB,
  useInsertDB,
  useUpdateDB,
} from "../../lib/hooks/useTableland";
import { LivepeerStream } from "../../lib/types";

const Create = () => {
  const theme = useTheme();
  const { wallet, setWallet } = React.useContext(AppState);
  const [stream, setStream] = React.useState<LivepeerStream>({
    title: "",
    description: "",
    id: "",
  });
  const [prevStream, setPrevStream] = React.useState<boolean>(false);
  const { mutate: createStream, data: streamData } = useCreateStream({
    name: stream.title,
  });

  const endStream = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Starting  delete");
    useDeleteDB({
      params: ["stream"],
      qColumn: "id",
      qVal: String(wallet.account).substring(0, 10),
    }).then(() => location.reload());
  };

  const updateStream = ({
    id,
    key,
    title,
    description,
    playbackId,
  }: LivepeerStream) => {
    const localStream: LivepeerStream = {
      key,
      title,
      description,
      id,
      playbackId,
    };

    console.log("This is the local stream ", localStream);
    useUpdateDB({
      params: ["stream"],
      values: [JSON.stringify(localStream)],
      qColumn: "id",
      qVal: wallet.account.substring(0, 10),
    });
  };

  React.useEffect(() => {
    setPrevStream(Boolean(wallet.user.stream));

    if (prevStream) {
      console.log("This is the prev stream status ", prevStream);
    }

    if (streamData && !prevStream) {
      setWallet((wallet) => {
        return {
          ...wallet,
          user: {
            ...wallet.user,
            stream: {
              description: stream.description,
              id: streamData.id,
              title: streamData.name,
              key: streamData.streamKey,
              playbackId: streamData.playbackId,
            },
          },
        };
      });
      updateStream({
        id: streamData.id,
        playbackId: streamData.playbackId,
        title: streamData.name,
        description: stream.description,
        key: streamData.streamKey,
      });
    } else {
      setStream({
        ...wallet.user.stream,
      });
    }
    return () => {
      setStream(undefined);
    };
  }, [streamData, wallet.user]);

  const startStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prevStream) {
      createStream();
    } else {
      console.log("end");
    }
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
          <ReadOnlyField
            label="RTMP Ingest URL"
            value="rtmp://rtmp.livepeer.com/live"
          />
          <ReadOnlyField
            value={
              streamData
                ? `https://livepeercdn.studio/hls/${streamData.playbackId}/index.m3u8`
                : stream.playbackId
                ? `https://livepeercdn.studio/hls/${stream.playbackId}/index.m3u8`
                : ""
            }
            label="Playback url"
          />
          <ReadOnlyField
            value={streamData ? streamData.streamKey : stream.key}
            label="Key"
          />
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
            onSubmit={prevStream ? endStream : startStream}
          >
            <Input
              placeholder="Title"
              fullWidth
              name="title"
              required
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
            <Button
              style={{
                color: "white",
                backgroundColor: prevStream ? "red" : undefined,
              }}
              type="submit"
            >
              {!prevStream ? "Create" : "End"}
            </Button>
          </form>
        </Box>
      </Stack>
      <Stack
        flex="1"
        borderRadius="10px"
        bgcolor={theme.palette.primary["800"]}
        height="50%"
        sx={{
          aspectRatio: "16/9",
        }}
      >
        <Player
          aspectRatio="16to9"
          playbackId={streamData?.playbackId ?? stream?.playbackId}
          title={streamData?.name ?? stream?.title}
          autoPlay
        />
      </Stack>
    </Stack>
  );
};

export default Create;
