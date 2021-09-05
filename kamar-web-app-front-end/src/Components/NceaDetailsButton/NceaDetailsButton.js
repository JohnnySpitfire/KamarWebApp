import React from 'react';
import { useHistory } from 'react-router';

const SignInButton = (props) => {
const history = useHistory()

const clickHandler = () => {
    props.OnNceaDetailsClick(history)
}
    
    return ( 
        <button onClick={clickHandler} id="ncea-details-button">NCEA Details</button>
    )
}

export default SignInButton;