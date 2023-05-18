import * as React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { Player } from "@livepeer/react";

const PreviewComponent = ({ title, playbackId }) => {
  console.log(playbackId);
  return (
    <Stack
      sx={{
        height: "100%",
        maxWidth: "300px",
        overflow: "hidden",
      }}
    >
      <Box
        maxHeight={"170px"}
        borderRadius={"5px"}
        sx={{
          overflow: "hidden",
        }}
      >
        <Box />
        <Player
          objectFit="contain"
          aspectRatio="16to9"
          playbackId={playbackId}
          autoPlay
          muted
          loop
          controls={{
            autohide: 0,
          }}
          showPipButton={false}
          showTitle={false}
        />
      </Box>
      {title}
      <Typography color={"grey"} fontSize="0.8em"></Typography>
    </Stack>
  );
};

export default PreviewComponent;
