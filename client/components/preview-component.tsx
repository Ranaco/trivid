import * as React from "react";
import { Stack, Typography, Chip, Box } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";

const StyledImage = styled(Image)(({}) => ({}));

const PreviewComponent = ({ title, creator, image }) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        height: "100%",
        maxWidth: "300px",
        overflow: "hidden",
      }}
    >
      <Box
        bgcolor={"blue"}
        maxHeight={"170px"}
        borderRadius={"5px"}
        sx={{
          overflow: "hidden",
        }}
      >
        <StyledImage
          sx={{
            transition: theme.transitions.create("scale"),
            ":hover": {
              scale: "1.08",
            },
          }}
          width={2900 / 5}
          height={2700 / 15}
          style={{
            objectFit: "contain",
            minWidth: "280px",
            aspectRatio: "16/9",
            maxWidth: "300px",
          }}
          alt="title"
          src={image}
        />
      </Box>
      {title}
      <Typography color={"grey"} fontSize="0.8em">
        {creator}
      </Typography>
    </Stack>
  );
};

export default PreviewComponent;
