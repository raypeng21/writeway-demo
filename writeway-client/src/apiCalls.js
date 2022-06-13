import axios from "./axios";


export const signinCall = async (userCredential, dispatch) => {

    dispatch({type: "LOGIN_START" });

    try{ 

        const res = await axios.post("auth/signin", userCredential);
        dispatch({type: "LOGIN_SUCCESS", package:res.data})

    }catch(err){

        dispatch({type: "LOGIN_FAILURE", package:err})

    }
}


export const signoutCall = async (userId,dispatch) => {

    try{
        await axios.put("/users/offline/" + userId)  //set online status to offline while sign out
        dispatch({type: "LOGOUT"})

    }catch(err){

        console.log(err)
    }
}