import React from "react";
import * as d3 from 'd3';
import {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from "react-virtualized";
import testnodes from './data/nodes.csv';

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

    const [options, setOptions] = React.useState([]);

    useEffect(() => {
    Promise.all([
            d3.dsv(",", testnodes, (node) => {
                return {
                    artist_id: node.artist_id, 
                    artist_name: node.artist_name, 
                    avg_duration: parseFloat(node.avg_duration), 
                    avg_familiarity: parseFloat(node.avg_familiarity), 
                    avg_hotness: parseFloat(node.avg_hotttnesss), 
                    total_tracks: parseInt(node.total_tracks)
                };
            })
        ]).then(allData => {
            let nodes = allData[0]; // all node data from the csv file
            setOptions(nodes)

        }).catch(error => {
            console.log(error)
        });

    }, [])

  return (
    <div>
      <Autocomplete
        id="virtualize-demo"
        style={{ width: 350 }}
        disableListWrap
        onChange={(event, newValue) => {
          props.onSelectedArtist(newValue)
        }}
        ListboxComponent={ListboxComponent}
        options={options}
        getOptionLabel={(option) => option.artist_name}
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
