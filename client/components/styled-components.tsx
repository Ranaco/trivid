import { styled, InputBase, alpha } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export const MuiImage = styled(Image)(({ theme }) => ({}));

export const MuiLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.light,
}));

export const Video = styled("video")(({ theme }) => ({
  height: "100%",
  width: "calc(100% - 95px)",
  borderRadius: "10px",
}));

export const Search = styled("div")(({ theme }) => ({
  borderRadius: "5px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  backdropFilter: "blur(10px)",
  height: "30px",
  marginLeft: 0,
  width: "100px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "30px",
  position: "absolute",
  borderRadius: "5px",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  borderRadius: "5px",
  height: "30px",
  fontFamily: "sans-serif",
  backgroundColor: theme.palette.primary["600"],
  backdropFilter: "blur(10px)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
