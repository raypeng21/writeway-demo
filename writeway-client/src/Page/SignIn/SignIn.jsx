import React ,{useContext, useRef}from 'react';
import './signin.scss';
import{signinCall} from "../../apiCalls.js";
import { Context } from '../../context/Context';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Checkbox } from '@material-ui/core';

function SignIn() {

  const email = useRef();
  const password = useRef();
  const {isFetching, dispatch} = useContext(Context);  //collecting email and password to fetching user data and dispatching 

  const handleClick =(e) => {
    e.preventDefault();
    signinCall({email: email.current.value, password:password.current.value}, dispatch)

  };

  return (
    <div className='signin' >
      
        <div className="signin_logo">
        <img src="assets/logo.png" alt="" />

        </div>
        <div className="signin_Container">
          <div className="word">
          Sign in to your account

          </div>



            <form className='signin_box' onSubmit={handleClick}>

              <input type="email" required placeholder='Email' ref= {email} />
              <input 
              type="password" 
              required 
              minLength={6}
              placeholder='Password' 
              ref= {password}/>

              <div className="signin_info">
              <p><Checkbox />Remember me</p>
              <a className='foeget_pass' href="s">Forget password?</a>



              </div>




              <button className='home_singnin' 
              type = "submit" 
              disabled = {isFetching}
              >{ isFetching ? <CircularProgress size="30px"/> : "Sign In" }
              </button>



            </form>


        </div>

    </div>
  )
}

export default SignIn