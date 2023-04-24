import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from "react-virtualized";



const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, role, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;

  return (
    <div ref={ref}>
      <div {...other}>
        <List
          height={250}
          width={350}
          rowHeight={50}
          overscanCount={5}
          rowCount={itemCount}
          rowRenderer={props => {
            return React.cloneElement(children[props.index], {
              style: props.style
            });
          }}
          role={role}
        />
      </div>
    </div>
  );
});

export default function VirtualizedAutocomplete(props) {


  return (
    <div>
      <Autocomplete
        // multiple
        id="virtualize-demo"
        style={{ width: 350 }}
        disableListWrap
        onChange={(event, newValue) => {
          props.onSelectedArtist(newValue)
        }}
        ListboxComponent={ListboxComponent}
        options={props.artist}
        defaultValue={'Akon'}

        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Search an Artist"
            fullWidth
          />
        )}
      />
    
    </div>
  );
}
