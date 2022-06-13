import React,{useRef, useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import IdeaPanel from '../../components/IdeaPanel/IdeaPanel';
import "./main.scss";


function Main() {

const textbox = useRef() //hooks to get text Legth
const [value, setValue] = useState("");  //text value for local storage
const[toggle, setToggle] = useState(0)


  const handleChange = (e) => {  //get textbox value, store to the local storage, set toggle to changed background 
    setValue(e.target.value);
    localStorage.setItem("inputValue", e.target.value);
    console.log(textbox.current.textLength)
    if(textbox.current.textLength === 0||textbox.current.textLength === 1||textbox.current.textLength === 2){  //active when start weiting
      setToggle(0);
      localStorage.setItem("toggle", toggle);
    }
    if(textbox.current.textLength === 150){
      setToggle(1);
      localStorage.setItem("toggle", toggle);
    }
    if(textbox.current.textLength === 300){
      setToggle(2);
      localStorage.setItem("toggle", toggle);
    }
    if(textbox.current.textLength === 450){
      setToggle(3);
      localStorage.setItem("toggle", toggle);
    }

    if(textbox.current.textLength === 600){
      setToggle(4);
      localStorage.setItem("toggle", toggle);
    }

  };


  useEffect(() => {  //load value from localStorage aviod lose data after refresh page
    setValue(localStorage.getItem("inputValue"));  
    setToggle(localStorage.getItem("toggle"));

  }, []);
  

  return (
    <div className='Main'>
        <div className="header">
            <Header />
        </div>

        <div className="body">

          <img className='background' src="assets/background.jpg" alt="" />

          {toggle ===0 &&         
          <video className='video_background' autoPlay loop muted>
              <source src="assets/video1.mp4" type='video/mp4' />
            </video>}
          {toggle ===1 &&         
          <video className='video_background' autoPlay loop muted>
              <source src="assets/video2.mp4" type='video/mp4' />
            </video>}
          {toggle===2 &&         
          <video className='video_background' autoPlay loop muted>
              <source src="assets/video3.mp4" type='video/mp4' />
            </video>}
          {toggle ===3 &&         
          <video className='video_background' autoPlay loop muted>
              <source src="assets/video4.mp4" type='video/mp4' />
            </video>}
          {toggle >=4 &&         
          <video className='video_background' autoPlay loop muted>
              <source src="assets/video5.mp4" type='video/mp4' />
            </video>}

          <div className="body_left">
            <img  className='main_card' src="assets/card.png" alt="" />
           </div>

          <div className="body_mid">



          <textarea 
          className="txt" 
          placeholder="Type '/' for commands" 
          ref={textbox} 
          value={value}
          onChange={handleChange}>
          </textarea>
          </div>

          <div className="body_right">
            <IdeaPanel />
           </div>


        </div>

    </div>
  )
}

export default Main