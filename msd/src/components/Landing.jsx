import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';

export default function Landing() {
  return (
    <div>
      <br></br><br></br>
      <div align = "center">
      <h1>
        Big Data Music <br></br>Visualization & Analysis</h1>
      <br></br><br></br>
      <Link to={"/network"}>
        <Button className="bt" variant="contained" >Arists Network </Button>
        </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={"/lyrics"}><Button className="bt" variant="contained" >Lyrics Analysis </Button></Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={"/sentiment"}><Button className="bt"  variant="contained" >Sentiment Analysis </Button></Link>
      </div>
    </div>
  )
}
