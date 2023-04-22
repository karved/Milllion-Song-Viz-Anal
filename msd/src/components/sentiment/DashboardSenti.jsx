import React from 'react';
import VirtualizedAutocomplete from "./VirtualizedAutocomplete";
import{useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Chart from './Chart.jsx';
import * as d3 from 'd3'
import sentiment from './data/sentiment_over_time.csv'

export default function DashboardSenti() {

  const [data,setData] = React.useState([])
  const [selectedArtist, setSelectedArtist] = React.useState("Akon");
const [artist, setArtist] = React.useState([]);
// const [tempA, setTempA] = React.useState(selectedArtist);


  useEffect(() => { 

    Promise.all([
          d3.dsv(",", sentiment, function (edge) {
              return {
                  year : parseInt(edge.year),
                  artist_id : edge.artist_id,
                  artist_name : edge.artist_name,
                  positive: parseInt(edge.positive),
                  negative: parseInt(edge.negative),
                  neutral : parseInt(edge.neutral)
              };
          })

        ]).then(allData => {

          setData(allData[0])

          setArtist([...new Set(allData[0].map(item =>  item.artist_name))])

        }).catch(error => {
          console.log(error)
        });

  }, [])

  return (
    <div>
      <br></br><br></br>
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid xs={4}>
            <VirtualizedAutocomplete onSelectedArtist = {setSelectedArtist} artist = {artist} />

            </Grid>
            <Grid xs>
              <Chart data = {data.filter(item => item.artist_name === selectedArtist)}/>

            </Grid>
          </Grid>
      </Box>
    </Container>


    </div>
  )
}
