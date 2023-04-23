import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

export default function Landing() {
  return (
    <div>
      <div align = "center" style={{marginTop: "7%"}}>
      <h1>
        Big Data Music <br></br>Visualization & Analysis
      </h1>
      <Container style={{width:"50%", marginTop:"3%"}}>
        <Box sx={{ flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid xs>
              <Link to={"/network"}>
                <Button className="bt" variant="contained" >Artists Network </Button>
              </Link> 
              </Grid>
              <Grid xs={4}>
                <Link to={"/lyrics"}><Button className="bt" variant="contained" >Lyrics Analysis </Button></Link>
              </Grid>
              <Grid xs>
                <Link to={"/sentiment"}><Button className="bt"  variant="contained" >Sentiment Analysis </Button></Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  )
}
