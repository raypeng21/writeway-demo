import "./share.scss";
import {Cancel} from "@material-ui/icons"
import { useContext,useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "../../axios";

export default function Share() {
  const {user} = useContext(Context);
  const desc = useRef();  
  const [file, setFile] = useState(null);

  
  const submitHandler = async (e) => {
    e.preventDefault();
    const newIdea = {
      userId: user._id,           //get user_id in idea info
      desc: desc.current.value,  //Get Text Value
    };

    if (file) {    //if submit with pictures
      const data = new FormData();
      const fileName =Date.now() + file.name;    //use update time to avoid pic with same name error
      data.append("name", fileName);
      data.append("file", file);
      newIdea.img = fileName;     //get img in idea info
      try {
        await axios.post("/upload", data);  //post  api - upload ideas 
      } catch (err) {}
    }
    try {
      await axios.post("/ideas", newIdea);
      window.location.reload();  //refresh page to show the newest upload idea
    } catch (err) {} 
  };

  return (
    <div className="share">

        {file && (


          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancel"  onClick ={() => setFile(null)}/>
          </div>


        )}

        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">


                <label htmlFor = "file" className="shareOption">
                    <span className="shareOptionText">+ Add Image</span>
                    <input
                    className="shareImage" 
                    type="file" 
                    id = "file" 
                    name = "file"
                    style = {{display: "none"}}
                    accept= ".png, .jpeg, .jpg" 
                    onChange={(e) =>setFile(e.target.files[0])}/>  
                </label>    


                <input
                  placeholder={"  New Idea"}
                  className="shareInput"
                  ref ={desc}
                />    


                <button className="shareButton" type = "submit">⇑</button>

            </div>
            
        </form>
    </div>
  );
}