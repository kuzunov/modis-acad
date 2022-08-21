import React, { useState } from "react";
import { TextField } from "@mui/material";

type SearchFieldProps = {
  searchFn: (term: string) => void;
};

function SearchField({ searchFn }: SearchFieldProps) {
  const [term, setTerm] = useState("");
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    searchFn(term);
  };
  return (
    <TextField
      name="username"
      onChange={handleFieldChange}
      id="text-username"
      label="Username"
      variant="outlined"
      type="required"
    />
  );
}

export default SearchField;
