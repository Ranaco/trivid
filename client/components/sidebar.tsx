import * as React from "react";
import { Router } from "next/router";
import {
  Box,
  Stack,
  IconButton,
  Typography,
  Fade,
  Divider,
  SxProps,
} from "@mui/material";
import { CgAddR } from "react-icons/cg";
import { BsPerson, BsStar } from "react-icons/bs";
import { RiSettingsLine, RiHome2Line } from "react-icons/ri";
import theme from "../lib/theme";
import { IconType } from "react-icons";

interface SideBarProps {
  sx: SxProps;
  router: Router;
}

interface NavButtonProps {
  Icon: IconType;
  onClick(): void;
  path: string;
  currentPath: string;
  title: string;
  isHovered: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  Icon,
  onClick,
  path,
  currentPath,
  title,
  isHovered,
}) => {
  const isActive = path === currentPath;

  const dynamicColor = isActive ? theme.palette.primary.dark : "grey";

  return (
    <Stack direction={"row"} alignItems="center" mt={"20px"}>
      <Fade in={isActive}>
        <Divider
          style={{
            height: "35px",
            width: "3px",
            backgroundColor: isActive ? theme.palette.primary.dark : undefined,
          }}
        />
      </Fade>
      <IconButton disableRipple onClick={onClick}>
        <Icon color={dynamicColor} size="0.9em" />
        <Fade in={isHovered}>
          <Typography pl={"20px"} color={dynamicColor}>
            {title}
          </Typography>
        </Fade>
      </IconButton>
    </Stack>
  );
};

const SideBar: React.FC<SideBarProps> = ({ router, sx }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Box
      zIndex={"1"}
      position="fixed"
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => setIsHovered(true)}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => setIsHovered(false)}
      sx={{
        ...sx,
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
        transition: theme.transitions.create("width"),
        ":hover": {
          width: "150px",
        },
      }}
      bgcolor={theme.palette.primary["600"]}
      style={{
        backdropFilter: "blur(8px)",
      }}
      width={"50px"}
      mt="40px"
      pr={"30px"}
      pt={"20px"}
      height="calc(100vh - 40px)"
    >
      <Stack gap={"20px"} justifyContent="start" alignItems={"start"}>
        <NavButton
          isHovered={isHovered}
          currentPath={router.asPath}
          onClick={() => router.push("/")}
          path="/"
          title="Home"
          Icon={RiHome2Line}
        />
        <NavButton
          isHovered={isHovered}
          currentPath={router.asPath}
          onClick={() => router.push("/people")}
          path="/people"
          title="People"
          Icon={BsPerson}
        />
        <NavButton
          isHovered={isHovered}
          currentPath={router.asPath}
          onClick={() => router.push("/create")}
          path="/create"
          title="Create"
          Icon={CgAddR}
        />
      </Stack>
    </Box>
  );
};

export default SideBar;
