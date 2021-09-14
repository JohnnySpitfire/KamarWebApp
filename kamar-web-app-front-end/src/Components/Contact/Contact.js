import React from 'react';
import { withRouter } from 'react-router';
import Header from '../Header/Header';
import './contact.css'

const Contact = (props) =>{
    console.log(props)
    return(
    <React.Fragment>
        <Header isSignedIn={props.isSignedIn} signOut={props.signOut}/>
        <div className='contact-wrapper'>
        </div>
    </React.Fragment>
    )
}

export default withRouter(Contact)