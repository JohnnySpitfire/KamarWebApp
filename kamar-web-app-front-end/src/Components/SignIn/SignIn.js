import React from 'react';
import SignInButton from '../SignInButton/SignInButton';
import {
  Link,

} from "react-router-dom";
import './sign-in-style.css';


class SignIn extends React.Component{

  constructor() {
    super();
    this.state = {
      signInUsername: '',
      signInPassword: '',
      signInMessage: '',
      validUser: false
    }
  }

onUsernameChange = (event) => {
    this.setState({ signInUsername: event.target.value})
}

onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value})
}

 
onSubmitSignIn = (history) => {
  fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.signInUsername,
        password: this.state.signInPassword
    })
  })
  .then(response => response.json())
  .then(user => {
      if (user[0].id){
        this.setState({ validUser: true});
        this.props.loadUser(user);
        history.push('Home');
      } else if (!user.id){
          this.setState({signInMessage: 'Incorrect Username/Password Combination'});
      }
  }).catch(err => console.log(err))
}

render() {
    return (
      <div className='sign-in-container'>
          <div className="sign-in-wrapper">
              <h2 className = 'sign-in-h2'>Please sign in</h2>
              <form className='sign-in-form'>
                  <label className='sign-in-label' id='sign-in-error'>{this.state.signInMessage}</label>
                  <label className='sign-in-label' htmlFor="username-input">Username</label>
                  <input onChange={this.onUsernameChange} className='sign-in-input' type="text" id="username-input" name="username-input"/>
                  <label className='sign-in-label' htmlFor="password-input">Password</label>
                  <input onChange={this.onPasswordChange} className='sign-in-input' type="password" id="password-input" name="password-input"/>
                  <SignInButton validUser={this.state.validUser} onSubmitSignIn={this.onSubmitSignIn}/>
                  <Link to ='/Home'>
                    <p>Continue Without Signing In</p>
                  </Link>
              </form>
          </div>
       </div>
   )}
}

export default SignIn;