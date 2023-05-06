import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  ButtonGroup,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material";
import TextButton from "../components/text-button";
import { RiSearch2Line } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { useRouter } from "next/router";
import {
  MuiLink,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./styled-components";
import useTableDb from "../lib/hooks/useTableland";
import { AppState } from "../pages/_app";

const NavBar = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { wallet, setWallet } = React.useContext(AppState);

  const router = useRouter();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const size = useMediaQuery(theme.breakpoints.down("md"));
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box
      bgcolor={theme.palette.primary["600"]}
      position="fixed"
      zIndex={"1"}
      height={"40px"}
      width="100vw"
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      <Stack
        direction={"row"}
        p={"0px 15px 0px 15px"}
        alignItems={"center"}
        height="100%"
        gap={"15%"}
      >
        <MuiLink href="/">
          <Typography variant="h5">{"One"}</Typography>
        </MuiLink>
        <Toolbar
          disableGutters
          style={{
            gap: lgSize ? "60px" : "70%",
          }}
        >
          <ButtonGroup style={{}}>
            <TextButton onTap={() => console.log("Trending")}>
              {"Trending".toUpperCase()}
            </TextButton>
            <TextButton onTap={() => console.log("game")}>
              {"games".toUpperCase()}
            </TextButton>
          </ButtonGroup>
          <Search
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
              display: { xl: "100", xs: "block" },
            }}
          >
            <SearchIconWrapper>
              <RiSearch2Line size={"20px"} />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(val) => console.log(val.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Stack
            display={"flex"}
            alignItems="center"
            position={"fixed"}
            direction="row"
            gap={"20px"}
            right="10px"
          >
            <ButtonGroup
              sx={{
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
                ml: "80px",
                gap: "20px",
              }}
            >
              <IconButton
                aria-label="chat"
                onClick={() => console.log(wallet.chainId)}
              >
                <IoChatbubbleEllipsesOutline color="white" />
              </IconButton>
              <IconButton aria-label="bell">
                <FiBell color="white" />
              </IconButton>
            </ButtonGroup>
            <IconButton
              sx={{ p: "0px" }}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                size ? handleMenuOpen(e) : router.push("/profile")
              }
            >
              <Avatar
                sx={{
                  color: "grey",
                  bgcolor: "white",
                  height: "30px",
                  width: "30px",
                }}
              />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                mt: "40px",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {isSm
                ? ["Home", "People", "Create"].map((e, index) => (
                    <MenuItem key={index}>
                      <MuiLink
                        href={`/${e != "Home" ? e.toLowerCase() : ""}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        {e}
                      </MuiLink>
                    </MenuItem>
                  ))
                : undefined}
              <MenuItem>
                <MuiLink
                  href={"/profile"}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Profile
                </MuiLink>
              </MenuItem>
              <MenuItem>Notfication</MenuItem>
              <MenuItem>Messages</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Stack>
    </Box>
  );
};

export default NavBar;
