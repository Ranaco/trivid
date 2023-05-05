import * as React from "react";
import { Stack, useTheme, Box } from "@mui/material";
import { BsClipboard } from "react-icons/bs";
import ReadOnlyField from "../../components/readonly-field";

const Create = () => {
  const theme = useTheme();

  return (
    <Stack gap="10px" height="100%" width={"100%"} p="15px">
      <Stack
        pt="20px"
        borderRadius="10px"
        bgcolor={theme.palette.primary["800"]}
        width="100%"
        height="40%"
      >
        <Box pl="10px" width={"30%"}>
          <ReadOnlyField defaultValue="KK" label="RTMP Ingest URL" />
          <ReadOnlyField defaultValue="Something" label="SRT Ingest URL" />
          <ReadOnlyField defaultValue="Playback" label="Playback URL" />
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
