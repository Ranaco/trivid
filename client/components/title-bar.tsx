import * as React from "react";
import { Chip, Stack } from "@mui/material";
import Link from "next/link";

interface TitleBarProps {
  title: string;
  onClick(): void;
}

const TitleBar: React.FC<TitleBarProps> = ({ title, onClick }) => {
  return (
    <Stack
      direction={"row"}
      pl="10px"
      justifyContent="space-between"
      mt={"20px"}
    >
      {title}
      <Link href={"/"}>
        <Chip
          label="View all"
          style={{
            marginRight: "20px",
          }}
        />
      </Link>
    </Stack>
  );
};

export default TitleBar;
