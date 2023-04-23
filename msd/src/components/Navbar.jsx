import React from 'react'
import Drawer from '@mui/material/Drawer';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';

export default function Navbar(props) {
  return (
    <div>
        
        <Drawer
        sx={{
          width: "15%",
          
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: "15%",
            bgcolor:"black",
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
           <div style={{ marginTop:"20%" , color:"white" ,fontSize:"20px"}} align="center">
           <Link to={"/"}>
            Big Data Music <br></br>Visualization & Analysis
            </Link>
           {(props.val===2 || props.val === 3) && <div style={{marginTop:"20%"}}>
                <Link to={"/network"}>
                <Button className="bt" variant="contained" >Artists Network </Button>
                </Link> 
                </div>}

                  {(props.val===1 || props.val === 3) && <div style={{marginTop:"20%"}}>
                    <Link to={"/lyrics"}><Button className="bt" variant="contained" >Lyrics Analysis </Button></Link>
                </div>}


                {(props.val===2 || props.val === 1) &&  <div style={{marginTop:"20%"}}>
                <Link to={"/sentiment"}><Button className="bt"  variant="contained" >Sentiment Analysis </Button></Link>
                </div>}
            </div>
      
        </Drawer>
    </div>
  )
}
