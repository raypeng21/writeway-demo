
import "./idea.scss";
import { useState, useEffect, useContext} from "react";
import axios from "../../axios";
import { Context } from '../../context/Context';

export default function Idea({idea}) {
  const [like,setLike] = useState(idea.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  const {user : currentUser } = useContext(Context)

  useEffect(() => {                       
    setIsLiked(idea.likes.includes(currentUser?._id))  //check if ideas being liked by user or not

  }, [currentUser?._id, idea.likes])
  
  useEffect(() => {
      const fetchUser = async () =>{
          const res = await axios.get(`/users?userId=${idea.userId}`);
            //fetching idea's author info
          setUser(res.data);
      }
      
      fetchUser();

  }, [idea.userId])


  const likeHandler =()=>{
    try { //send api to change likes status in database
      axios.put("/ideas/" + idea._id + "/likes", {userId: currentUser._id})
    } catch (err) {
      
    }
    
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="idea">
      <div className="ideaWrapper">
        <div className="ideaTop">
          <div className="ideaTopLeft">
            <img
              className="ideaProfileImg"
              src={user.profilePicture}
              alt=""
            />

            <span className="ideaUsername">
              {user.username}
            </span>
            <span className="ideaDate"></span>
          </div>
          <div className="ideaTopRight">
          <div className="ideaBottomLeft">

            <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
            <span className="ideaLikeCounter"> {like}</span>
        </div>
          </div>
        </div>
        <div className="ideaCenter">
          <span className="ideaText">{idea.desc}</span> 
          <img className="ideaImg" src={`http://localhost:9000/images/${idea.img}`}  alt="" />
                        
        </div>
        <div className="ideaBottom">
          <div className="ideaBottomRight">
            <span className="ideaCommentText"></span>
          </div>
        </div>
      </div>
    </div>
  );
}