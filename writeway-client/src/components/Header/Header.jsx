import React, { useState } from 'react'
import "./header.scss"
import {Button, Popover} from "@material-ui/core";

function Header() {
  const [logoAnchor, setLogoAnchor] = useState(null);
  const openLogoMenufile = (event) =>{
    setLogoAnchor(!logoAnchor)
  } 



  const [voiceAnchor, setvoiceAnchor] = useState(null);
  const openVoice = (event) =>{
    setvoiceAnchor(event.currentTarget)
  } 

  const [locationAnchor, setlocationAnchor] = useState(null);
  const openLocation = (event) =>{
    setlocationAnchor(event.currentTarget)
  } 


  const [structureAnchor, setstructureAnchor] = useState(null);
  const openStructure = (event) =>{
    setstructureAnchor(event.currentTarget)
  } 



  const [settingAnchor, setsettingAnchor] = useState(null);
  const openSetting = (event) =>{
    setsettingAnchor(event.currentTarget)
  } 



  return (
    <div className='header'>

        <div className="header_left">
            <Button
            onClick={openLogoMenufile}
            ><img src="assets/w_logo.png" alt="writeway" className='header_logo' /> 
            </Button>

            
            <Popover

              open={logoAnchor}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 50, left: 30 }}
              onClose={() => setLogoAnchor(null)}
            >
              <img src="assets/Menu.png" alt="menu" className='menu' />

            </Popover>


            <Button>
              <img src="assets/card.svg" alt="card" className='header_card' />
            </Button>

        </div>

        <div className="header_mid">

              <Button
                onClick={openVoice}
              >
              <img src="assets/voice.svg" alt="voice" className='header_voice' />
              </Button>
              <Popover
              open={voiceAnchor}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 50, left: 750 }}
              onClose={() => setvoiceAnchor(null)}
            >
              <img src="assets/voice.png" alt="menu" className='menu' />

            </Popover>




              <Button
                onClick={openLocation}
              >
                <img src="assets/location.svg" alt="location" className='header_location' />
              </Button>
              <Popover
              open={locationAnchor}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 50, left: 550 }}
              onClose={() => setlocationAnchor(null)}
            >
              <img src="assets/location.png" alt="location" className='menu' />

            </Popover>




        </div>

        <div className="header_right">
          <div className="header_right_icon">


              <Button onClick={openStructure}>
                <img src="assets/structure.svg" alt="voice" className='header_structure' />
              </Button>
              <Popover
              open={structureAnchor}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 50, left: 1488 }}
              onClose={() => setstructureAnchor(null)}
              >
              <img src="assets/structure.png" alt="location" className='menu' />
              </Popover>



              <Button> 
                <img src="assets/ideas.svg" alt="voice" className='header_ideas' />
              </Button> 




        <Button
          onClick={openSetting}
          >
          <img src="assets/setting.svg" alt="voice" className='header_setting' />
        </Button> 
        <Popover
              open={settingAnchor}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 50, left: 1488 }}
              onClose={() => setsettingAnchor(null)}
            >
              <img src="assets/setting.png" alt="location" className='menu' />

            </Popover>


          </div>

        </div>


        
        </div>
  )





}

export default Header


