import { Button, Typography } from "@mui/material";
import * as React from "react";
import MetaFox from "../public/images/MetaMask_Fox.svg";
import Image from "next/image";
import { useTheme } from "@mui/material";
import { mplus } from "../lib/theme";

interface MetaButtonProps {
  onClick: React.MouseEventHandler<HTMLElement>;
}

const MetamaskButton: React.FC<MetaButtonProps> = ({ onClick }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      sx={{
        bgcolor: theme.palette.primary["100"],
        backdropFilter: "blur(10px)",
        gap: "10px",
        [theme.breakpoints.down("md")]: {
          bgcolor: theme.palette.primary["600"],
        },
        mt: "auto",
        mb: "auto",
      }}
    >
      <Image src={MetaFox} alt="Metamask Fox" height={1800 / 30} />
      <Typography fontFamily={"sans-serif"}>Login with Metamask</Typography>
    </Button>
  );
};

export default MetamaskButton;
