import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { BsClipboard, BsFillClipboardCheckFill } from "react-icons/bs";

interface ReadOnlyFieldProps {
  label: string;
  value?: string;
}

const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({ label, value }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <TextField
      fullWidth
      focused={false}
      value={value}
      size="small"
      sx={{
        zIndex: "0",
        py: "10px",
        minWidth: "220px",
        fontSize: "1.2em",
        color: "grey",
      }}
      color="info"
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            {isCopied ? (
              <BsFillClipboardCheckFill color="green" />
            ) : (
              <BsClipboard
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(value).then(() => {
                    setIsCopied(true);
                  });
                }}
              />
            )}
          </InputAdornment>
        ),
      }}
      label={label}
      variant="outlined"
    />
  );
};

export default ReadOnlyField;
