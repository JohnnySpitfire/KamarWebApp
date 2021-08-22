import React from 'react';
import { useHistory } from 'react-router';

const SignInButton = (props) => {
const history = useHistory()

const clickHandler = () => {
    props.onSubmitSignIn(history)
}

    return ( 
        <input onClick={clickHandler} id="submit-button" type="button" value="Log In"/>
    )
}

export default SignInButton;