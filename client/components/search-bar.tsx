import * as React from "react";
import { Box, Input } from "@mui/material";

const SearchBar = () => {
  const [serachPhrase, setSearchPhrase] = React.useState<string>("");

  return (
    <Box>
      <Input></Input>
    </Box>
  );
};
