import React from 'react';
import VirtualizedAutocomplete from "./VirtualizedAutocomplete";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Graph from './Graph';

function DashboardNet() {

  const [selectedArtist, setSelectedArtist] = React.useState({
    "artist_id": "ARCGJ6U1187FB4D01F",
    "artist_name": "Akon",
    "avg_duration": 234.80339679245287,
    "avg_familiarity": 0.9902253716581698,
    "avg_hotness": 0.8267770134909992,
    "total_tracks": 53,
    "x": 450.67885467558176,
    "y": 35.67568001936708
});
  const [sliderValue, setSliderValue] = React.useState(7);
  const [tempA, setTempA] = React.useState(selectedArtist);
  const [tempS, setTempS] = React.useState(sliderValue);

  console.log(tempA,tempS)


  return (
    <div>
      <br></br><br></br>
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid xs={4}>
              <br></br>
              <VirtualizedAutocomplete onSelectedArtist = {setTempA} />
              <br></br>
              <h3>Number of Artists</h3>
              <Slider
               defaultValue={7} 
               aria-label="Number of Similar Artists" 
               valueLabelDisplay="auto"
               min={1}
               max = {25} 
               style={{ width: 350, color: "black" }}
               onChange={(event, newValue) => {
                setTempS(newValue)
              }}
               />
              <br></br><br></br><br></br>
              <Button className="bt" variant="contained"
                    onClick={() => { 
                                    setSelectedArtist(tempA)
                                    setSliderValue(tempS)
                        }}>
                      Search
              </Button>
              <br></br><br></br><br></br><br></br>
              <div id="recommendations-div" />
            </Grid>
            <Grid xs>
            <Graph sA={selectedArtist} sV={sliderValue} />

            </Grid>
          </Grid>
      </Box>
    </Container>

    </div>
  )
}

export default DashboardNet