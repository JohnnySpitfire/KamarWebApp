import React from 'react';
import { useHistory } from 'react-router';

const SignInButton = (props) => {

    const history = useHistory()
    //lifecycle hook for functional components
    React.useEffect(() => {
        props.getHistory(history);
    }, []); 

    return ( 
        <input onClick={props.onSubmitSignIn} id="submit-button" type="button" value="Log In"/>
    )
}

export default SignInButton;    