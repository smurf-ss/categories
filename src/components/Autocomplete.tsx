import React from "react";

import TextField from "@material-ui/core/TextField";
import AutocompleteMaterialUI, {
  AutocompleteRenderInputParams,
} from "@material-ui/lab/Autocomplete";

type AutocompleteOptions = { label: string };

type AutocompleteProps = {
  name: string;
  value: string | null;
  onChange: (name: string, value: string | null) => void;
  options: AutocompleteOptions[];
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  onChange,
  options = [],
  value,
}) => {
  return (
    <AutocompleteMaterialUI
      freeSolo
      size='small'
      clearOnEscape
      filterSelectedOptions
      options={options}
      getOptionLabel={(option: AutocompleteOptions) => option?.label || ""}
      style={{ width: 300 }}
      value={{ label: value || "" }}
      onChange={(
        event: React.ChangeEvent<{}>,
        newValue: string | AutocompleteOptions | null
      ) => {
        if (typeof newValue === "object" && newValue?.label) {
          onChange(name, newValue?.label);
        } else {
          onChange(name, newValue as string);
        }
      }}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} label='Search Input' variant='outlined' />
      )}
    />
  );
};

export default Autocomplete;
