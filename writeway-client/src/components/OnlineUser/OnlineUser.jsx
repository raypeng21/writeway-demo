import "./onlineuser.scss"

function OnlineUser({profilePircture, OnlineStatus}) {

  
  let status = (OnlineStatus===true) ? "Online_friend" : "Offline_friend";



  return (
    <div className="OnlineUser">
      <img className="shareProfileImg" src={profilePircture} alt="" />
      <button className={status} alt="" />

    </div>
  )
}

export default OnlineUser