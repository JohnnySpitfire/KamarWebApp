import React from 'react';
import Header from '../Header/Header';
import { withRouter } from 'react-router';

const Contact = (props) =>{
    return(
            <React.Fragment>
                <Header isSignedIn={props.isSignedIn}/>
                <div className='contanct-wrapper'>OOOGA</div>
            </React.Fragment>
         )
}

export default withRouter(Contact)