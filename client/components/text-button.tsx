import { Button, Typography } from "@mui/material";
import * as React from "react";

interface TextButtonProps {
  onTap(): void;
  children: React.ReactNode;
}

const TextButton: React.FC<TextButtonProps> = ({ onTap, children }) => {
  return (
    <Button
      style={{
        width: "12ch",
      }}
      onClick={onTap}
      variant="text"
    >
      <Typography fontSize={"0.7em"}>{children}</Typography>
    </Button>
  );
};

export default TextButton;
