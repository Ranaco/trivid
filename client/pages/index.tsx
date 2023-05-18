import { Stack, useTheme } from "@mui/material";
import TrendingComponent from "../components/trending-component";
import PreviewComponent from "../components/preview-component";
import TitleBar from "../components/title-bar";
import { MuiLink } from "../components/styled-components";
// import { AppState } from "./_app";
import * as React from "react";
import { useReadDB } from "../lib/hooks/useTableland";
import { LivepeerStream, TriUser } from "../lib/types";

const Homepage = (props: any) => {
  const streams: any = props.activeStreams;
  console.log(streams);

  // const { wallet } = React.useContext(AppState);
  const theme = useTheme();
  return (
    <Stack>
      <TrendingComponent />
      <TitleBar
        title="Streams of the day"
        onClick={() => console.log("Stream of the day")}
      />
      <Stack
        direction={"row"}
        gap={"10px"}
        height={"300px"}
        width="calc(100vw - 50px)"
        sx={{
          [theme.breakpoints.down("md")]: {
            width: "100vw",
            pl: "10px",
          },
        }}
        overflow={"scroll"}
        pt={"20px"}
        pb={"10px"}
      >
        {streams
          ? streams.map((e: LivepeerStream, index: number) => (
              <MuiLink href={`/player/${e.playbackId}`} key={index}>
                <PreviewComponent
                  playbackId={e.playbackId}
                  title={e.title}
                  key={index}
                />
              </MuiLink>
            ))
          : undefined}
      </Stack>
    </Stack>
  );
};

export const getStaticProps = async () => {
  const LIVEPEER_KEY = process.env.LIVEPEER_KEY;
  const users: TriUser[] = await useReadDB({
    params: ["*"],
  });

  const streams: LivepeerStream[] = users.map((e) => e.stream);
  console.log("These are the streams ", streams);
  if (streams[0] !== null) {
    let activeStreams = [];
    const fetchPromises = streams.map((stream) =>
      fetch(`https://livepeer.studio/api/stream/${stream.id}`, {
        headers: {
          Authorization: `Bearer ${LIVEPEER_KEY}`,
        },
      }).then((res) => res.json())
    );

    const streamResponses = await Promise.all(fetchPromises);
    console.log("This is the stream res", streamResponses);

    activeStreams = streams.filter(
      (e, index) =>
        e.id === streamResponses[index].id && streamResponses[index].isActive
    );

    return {
      props: {
        activeStreams,
      },
    };
  }
  return {
    props: {
      activeStreams: [],
    },
  };
};

export default Homepage;
