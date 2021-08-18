import React from 'react';
import {
  Link
} from "react-router-dom";
import './sign-in-style.css';

const SignIn = () => {
    return (
      <div className='sign-in-container'>
          <div className="sign-in-wrapper">
              <h2 className = 'sign-in-h2'>Please sign in</h2>
              <form className='sign-in-form'>
                  <label className='sign-in-label' htmlFor="username-input">Username</label>
                  <input className='sign-in-input' type="text" id="username-input" name="username-input"/>
                  <label  className='sign-in-label' htmlFor="password-input">Password</label>
                  <input className='sign-in-input' type="password" id="password-input" name="password-input"/>
                  <input id="submit-button" type="button" value="Log In"/>
                  <Link to ='/Home'>
                    <p>Continue Without Signing In</p>
                  </Link>
              </form>
          </div>
       </div>
   )
}

export default SignIn;