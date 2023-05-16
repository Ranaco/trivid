import * as React from "react";
import { Box, Stack, Typography, Avatar, useTheme } from "@mui/material";
import { MuiImage } from "../../components/styled-components";
import { FcPhotoReel } from "react-icons/fc";
import { AppState } from "../_app";
import { Spinner } from "@chakra-ui/react";
import { TriUser } from "../../lib/types";
import { Player } from "@livepeer/react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ProfileAvatar from "../../components/profile-avatar";
import { useUpdateDB } from "../../lib/hooks/useTableland";
import uploadToIpfs from "../../lib/sph-browser-upload";

const Profile = () => {
  const theme = useTheme();
  const { wallet, setWallet } = React.useContext(AppState);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<TriUser | undefined>(undefined);
  const [file, setFile] = React.useState<any[] | undefined>();

  const uploadProfile = async () => {
    console.log("This is the file", file);
    const { bucketId, dynamicLinks, protocolLink, uploadId } =
      await uploadToIpfs({ file: file });
    const profile = protocolLink + "/" + file[0].path;
    await useUpdateDB({
      params: ["profile"],
      values: [profile],
      qColumn: "id",
      qVal: String(wallet.account).substring(0, 10),
    }).then(() => {
      setWallet((wal) => ({
        ...wal,
        user: {
          ...wal.user,
          profile,
        },
      }));
    });
  };
  React.useEffect(() => {
    if (wallet.user) {
      setIsLoading(false);
      setUser(wallet.user);
    }

    return () => setUser(undefined);
  }, [wallet.user]);

  return isLoading ? (
    <Spinner />
  ) : (
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
          <ProfileAvatar
            uploadProfile={uploadProfile}
            file={file}
            profile={wallet.user.profile}
            setFile={setFile}
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
              {user.name}
            </Typography>
            <Typography color="grey">{user.bio}</Typography>
          </Stack>
        </Stack>
        {!user.stream ? (
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
              <FcPhotoReel
                size={"150px"}
                color={theme.palette.secondary.light}
              />
            </Stack>
          </Stack>
        ) : (
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "calc(100vw - 500px)",
              },
              aspectRatio: "16/9",
            }}
            pt="50px"
            width="calc(100vw - 500px)"
          >
            <Player
              objectFit="cover"
              aspectRatio="16to9"
              playbackId={user.stream.playbackId}
              title={user.stream.title}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
};
export default Profile;
