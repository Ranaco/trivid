import { Avatar, Box, Stack } from "@mui/material";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { BsPencil } from "react-icons/bs";
import { RxCheck } from "react-icons/rx";
import uploadToIpfs from "../lib/sph-browser-upload";
import { useUpdateDB } from "../lib/hooks/useTableland";

interface AvatarProps {
  profile: string | File | undefined;
  uploadPercent?: string;
  file: any[] | undefined;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  uploadProfile: any;
}

const ProfileAvatar = ({
  profile,
  uploadPercent,
  file,
  setFile,
  uploadProfile,
}: AvatarProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedfile) => {
      const file = acceptedfile[0];
      setFile(
        acceptedfile.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
      console.log(file.size.toString());
      console.log(file.name);
    },
  });
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: "200px",
        width: "200px",
        borderRadius: "100%",
      }}
    >
      <Stack
        onClick={file ? uploadProfile : undefined}
        zIndex={1}
        {...(file ? undefined : getRootProps())}
        sx={{
          cursor: "pointer",
        }}
        height="40px"
        width="40px"
        bgcolor={"pink"}
        bottom="10px"
        right="10px"
        alignItems={"center"}
        justifyContent="center"
        position="absolute"
        borderRadius={"100%"}
      >
        {file ? (
          <RxCheck color="black" size="20px" />
        ) : (
          <BsPencil color="black" size="20px" />
        )}
      </Stack>
      {isDragActive ? (
        <Box
          bgcolor={"blackAlpha.100"}
          borderRadius={"100%"}
          height="200px"
          width="200px"
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          border="3px dotted grey"
        >
          Drop here
        </Box>
      ) : (
        <Image
          src={file ? file[0].preview : profile ?? "/images/noProfile.png"}
          alt="Some image"
          fill
          style={{ borderRadius: "100%" }}
        />
      )}
    </Box>
  );
};

export default ProfileAvatar;
