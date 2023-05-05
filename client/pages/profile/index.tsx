import { Box, Stack, Typography, Avatar, useTheme } from "@mui/material";
import { MuiImage } from "../../components/styled-components";
import { FcPhotoReel } from "react-icons/fc";

const Profile = () => {
  const theme = useTheme();

  return (
    <Box
      width="calc(100vw - 40px)"
      sx={{
        [theme.breakpoints.down("sm")]: {
          width: "100vw",
        },
      }}
    >
      <Box height="30vh" position={"relative"} width="100%">
        <MuiImage
          sx={{
            [theme.breakpoints.down("md")]: {
              objectFit: "cover",
            },
          }}
          src="https://picsum.photos/900/350"
          alt="Wall url"
          fill
        />
      </Box>
      <Stack
        justifyContent={"center"}
        alignItems="center"
        position="absolute"
        top={"25%"}
      >
        <Stack
          pl="80px"
          width={"calc(100vw - 50px)"}
          direction="row"
          gap="30px"
          sx={{
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "center",
              pl: "0",
              gap: "0px",
            },
          }}
        >
          <Avatar
            src={"https://picsum.photos/500"}
            sx={{
              height: "200px",
              width: "200px",
            }}
          />
          <Stack
            pt="80px"
            sx={{
              [theme.breakpoints.down("md")]: {
                alignItems: "center",
                pt: "20px",
              },
            }}
          >
            <Typography fontSize={"2em"} fontWeight="bold">
              Kevin Smith
            </Typography>
            <Typography color="grey">
              Advisor and Consultant at Stripe Inc.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          alignItems={"center"}
          justifyContent="center"
          textAlign={"center"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "100vw",
            },
          }}
          width={"100%"}
        >
          <Typography fontSize="3em" pt="20px">
            Nothing to show
          </Typography>
          <Stack
            p="30px"
            border={`1px solid ${theme.palette.secondary.light}`}
            width="50%"
            borderRadius={"10px"}
            justifyContent="center"
            alignItems={"center"}
          >
            <FcPhotoReel size={"150px"} color={theme.palette.secondary.light} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
export default Profile;
