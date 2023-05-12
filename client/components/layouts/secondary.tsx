import * as React from "react";
import { Box } from "@mui/material";
import Head from "next/head";

interface Props {
  title: string;
  children: JSX.Element;
}

const Secondary: React.FC<Props> = ({ title, children }) => {
  return (
    <Box maxHeight="100vh" maxWidth="100vw">
      <Head>
        <title>{title}</title>
      </Head>
      <Box width={"100vw"} height="100vh">
        {children}
      </Box>
    </Box>
  );
};

export default Secondary;
