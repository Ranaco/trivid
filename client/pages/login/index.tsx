import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { AppState } from "../_app";
import Layout from "../../components/layouts/secondary";
import { Video } from "../../components/styled-components";
import MetamaskButton from "../../components/login-button";

const Login = () => {
  const { wallet } = React.useContext(AppState);
  const router = useRouter();

  React.useEffect(() => {
    if (wallet.account) {
      router.replace("/");
    }
  }, [wallet.account]);

  return (
    <Box
      flexDirection={"column"}
      sx={{
        borderRadius: "5px",
        display: "flex",
        height: "100%",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Video
        autoPlay
        loop
        playsInline
        muted
        sx={{
          zIndex: "-1",
          height: "100%",
          width: "100%",
          position: "fixed",
          objectFit: "cover",
        }}
      >
        <source src="/videos/masthead-bg.webm" type="video/webm; codecs=vp9" />
        <source src="/videos/masthead-bg.mp4" type="video/mp4; codecs=hvc1" />
      </Video>
      <Typography
        sx={{
          pt: "150px",
          textAlign: "center",
          fontSize: "2.5em",
          textShadow: "#615f5f 0px 5px 3px",
        }}
      >
        Welcome to the <br />
        <b
          style={{
            fontSize: "2em",
          }}
        >
          Trivid
        </b>
        <br />
        community
      </Typography>
      <MetamaskButton onClick={wallet.handleConnect} />
    </Box>
  );
};

Login.getLayout = (page: JSX.Element) => {
  return <Layout title="Login">{page}</Layout>;
};

export default Login;
