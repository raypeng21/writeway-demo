import { useState, useEffect, useContext} from "react";
import Feed from '../Feed/Feed'
import {signoutCall} from "../../apiCalls.js";
import { Context } from '../../context/Context';
import SearchIcon from '@material-ui/icons/Search';
import axios from "../../axios";
import OnlineUser from "../OnlineUser/OnlineUser";
import "./ideapanel.scss"
function IdeaPanel() {
    const {user ,dispatch} = useContext(Context)
    // const [newUserState, setNewUserState] = useState();
    const [isOnline,SetIsOnline] = useState(true)
    const[friends, setFriends] = useState([]);
    const[btnClass, setBtnClass] = useState( isOnline ? "Offline_Status": "Online_Status")



    const signout =  (e) => {
        e.preventDefault();

        signoutCall(user._id, dispatch)

    }

    
    useEffect(() => {     
        // SetIsOnline();

        const fetchFriends = async () =>{
            try {
                const friendList = await axios.get("/users/friends/" + user._id)
                setFriends(friendList.data);
              } catch (err) {
                console.log(err)
              }
            
            }

            fetchFriends();
            
      },[user.OnlineStatus,isOnline,user._id])
  
    
    const online = async () => {

    
            try {

                if(isOnline){
                    await axios.put("/users/offline/" + user._id)
                    SetIsOnline(false)
                }else{
                    await axios.put("/users/online/" + user._id)
                    SetIsOnline(true)
                }
            } catch (error) {
                console.log(error)
            }

            setBtnClass(isOnline ? "Offline_Status": "Online_Status")
            
    }




  return (
    <div className="Idea">
        <div className="title">
            Ideas

        </div>

        <div className="search_bar">
            <input className='header_search_input' type="text" placeholder='Search your ideas'/>
            <SearchIcon className='header_searchIcon' />
        </div>


        <div className="ideas_Container">
            <Feed />
        </div>



        <div className="onlineUser">

            <div className="user_wrapper">
                <img className="shareProfileImg userProfileImg" src={user.profilePicture} alt="" />
                <button className={btnClass} onClick={online}></button>

                    {friends.map(friend => (
                    <OnlineUser
                    profilePircture = {friend.profilePicture}
                    OnlineStatus = {friend.OnlineStatus} />
                    )
                    )}

            </div>

            <button className='signout' onClick={signout}>Sign Out</button>
        </div>



    </div>
  )
}

export default IdeaPanel