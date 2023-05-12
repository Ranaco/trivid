import * as React from "react";
import { Box, Button, Input, Stack, Typography } from "@mui/material";
import Layout from "../../components/layouts/secondary";
import { Video } from "../../components/styled-components";
import { FormSchema } from "../../lib/types";

const Register: React.FC = () => {
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
          onSubmit={(e) => {
            e.preventDefault();
            console.log(formData);
          }}
        >
          <Input
            required
            value={formData.name}
            name="name"
            onChange={onChange}
            fullWidth
            placeholder="Name"
          />
          <Input
            required
            value={formData.userName}
            onChange={onChange}
            name="userName"
            fullWidth
            placeholder="Username"
          />
          <Input
            required
            onChange={onChange}
            value={formData.email}
            name="email"
            fullWidth
            placeholder="Email"
          />
          <Input
            onChange={onChange}
            name="bio"
            fullWidth
            placeholder="Bio"
            value={formData.bio}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              color: "white",
            }}
          >
            Create
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
