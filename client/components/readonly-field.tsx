import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { BsClipboard, BsFillClipboardCheckFill } from "react-icons/bs";

interface ReadOnlyFieldProps {
  defaultValue: string;
  label: string;
}

const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({
  defaultValue,
  label,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <TextField
      id={`id-${defaultValue}`}
      fullWidth
      focused={false}
      defaultValue={defaultValue}
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
                  navigator.clipboard.writeText(defaultValue).then(() => {
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
