import React from 'react'
import './home.css'
import {
    Link
  } from "react-router-dom";
import Header from '../Header/Header';
import NceaOverview from '../NceaOverview/NceaOverview';
import {ReactComponent as SubjectResourcesImage} from '../img/card/subject-resources.svg';


const Home = (props) => {
return(
    <React.Fragment>
          <Header/>
            <div className={props.isSignedIn? 'main-container-signedin' : 'main-container-signedout'}>
                {props.isSignedIn?
                    <React.Fragment>
                        <div className="welcome-banner">
                            <h2 className='welcome-name'>Welcome {props.fullName}</h2>
                            <h2 className='welcome-nsn'>Your NSN is: {props.userNCEAProfile.nsn}</h2>
                        </div>
                        <NceaOverview updateCreditGoals={props.updateCreditGoals} userNCEAProfile={props.userNCEAProfile}/>
                    </React.Fragment>:
                    <div className="sign-in-warning"><h2><strong>To gain full access please sign in</strong></h2></div>}
                        <div className="sidebar-left zone">
                            <div className="sidebar-content">
                            <h3>External Links</h3>
                                <li><a href="https:/www.nzqa.govt.nz/">NZQA Website</a></li>
                                <li><a href="https:/www.rathkeale.school.nz">Rathkeale College Website</a></li> 
                                <li><a href="https:/portal.rathkeale.school.nz">The Worse KAMAR</a></li>
                        </div>
                    </div>
                    <div className="card-wrapper-index">
                        <Link to='./SubjectResources'>
                        <div className="card-index">    
                                <SubjectResourcesImage className='card-image-index' height="50%" width="50%"/>
                            <div className="card-text">
                                <h2>Subject Resources</h2>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="sidebar-right zone">
                        <div className="sidebar-content">
                        <h3>Popular Pages</h3>
                            {/* <li><a href="">Page 1</a></li>
                            <li><a href="">Page 2</a></li>
                            <li><a href="">Page 3</a></li>
                            <li><a href="">Page 4</a></li>
                            <li><a href="">Page 5</a></li> */}
                    </div>
                </div>
                    <div className="body zone">
                        <div className="body-content">
                            <p>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                    </div>
            </div>
    </React.Fragment>
    )
}


export default Home;