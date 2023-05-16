import * as React from "react";
import { Box, Button, Input, Stack, Typography, useTheme } from "@mui/material";
import Layout from "../../components/layouts/secondary";
import { Video } from "../../components/styled-components";
import { FormSchema } from "../../lib/types";
import { AppState } from "../_app";
import { useRouter } from "next/router";
import { useInsertDB, useReadDB } from "../../lib/hooks/useTableland";
import { Spinner } from "@chakra-ui/react";

const Register: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const { wallet, setWallet } = React.useContext(AppState);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormSchema>({
    name: "",
    userName: "",
    bio: "",
    email: "",
    profile: null,
  });

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    setIsProcessing(true);
    e.preventDefault();
    try {
      await wallet.userContract.methods
        .registerUser(wallet.account)
        .send({ from: wallet.account, gasPrice: "400000000" });
      useInsertDB({
        params: ["id", "name", "userName", "bio", "email"],
        values: [
          String(wallet.account).substring(0, 10),
          formData.name,
          formData.userName,
          formData.bio,
          formData.email,
        ],
      }).then(({ insert }) => {
        setWallet((val) => ({
          ...val,
          user: {
            ...val.user,
            name: formData.name,
            userName: formData.userName,
            bio: formData.bio,
            email: formData.email,
          },
        }));
        router.replace("/");
      });
    } catch (err) {
      console.log(err);
      setIsProcessing(false);
    }

    setIsProcessing(false);
  };

  return (
    <Stack
      alignItems={"center"}
      height="100%"
      sx={{
        textShadow: "#615f5f 0px 5px 3px",
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
      <Stack
        pt={"100px"}
        justifyContent="center"
        alignItems={"center"}
        width="40%"
        sx={{
          [theme.breakpoints.down("md")]: {
            width: "60%",
          },
          [theme.breakpoints.down("sm")]: {
            width: "80%",
          },
        }}
        gap="30px"
      >
        <Typography fontSize={"3.5em"}>Trivid</Typography>
        <Box>
          <Typography fontSize={"2.5em"}>Create an account</Typography>
          Let's get started!
        </Box>
        <form
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            paddingTop: "50px",
            alignItems: "center",
            gap: "50px",
          }}
          onSubmit={submit}
        >
          <Input
            disabled={isProcessing}
            required
            value={formData.name}
            name="name"
            onChange={onChange}
            fullWidth
            placeholder="Name"
          />
          <Input
            disabled={isProcessing}
            required
            value={formData.userName}
            onChange={onChange}
            name="userName"
            fullWidth
            placeholder="Username"
          />
          <Input
            disabled={isProcessing}
            required
            onChange={onChange}
            value={formData.email}
            name="email"
            fullWidth
            placeholder="Email"
          />
          <Input
            disabled={isProcessing}
            onChange={onChange}
            name="bio"
            fullWidth
            placeholder="Bio"
            value={formData.bio}
          />
          <Button
            disabled={isProcessing}
            type="submit"
            fullWidth
            sx={{
              height: "60px",
              color: "white",
            }}
          >
            {isProcessing ? <Spinner height={"40px"} width="40px" /> : "Create"}
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};

Register.getLayout = (page: JSX.Element) => (
  <Layout title="Register">{page}</Layout>
);

export default Register;
