import { Stack, useTheme } from "@mui/material";
import TrendingComponent from "../components/trending-component";
import PreviewComponent from "../components/preview-component";
import data from "../lib/demo-data";
import TitleBar from "../components/title-bar";
import { MuiLink } from "../components/styled-components";

const Homepage = () => {
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
        {data.map((e, index) => (
          <MuiLink href="/player/30" key={index}>
            <PreviewComponent {...e} />
          </MuiLink>
        ))}
      </Stack>
    </Stack>
  );
};

export default Homepage;
