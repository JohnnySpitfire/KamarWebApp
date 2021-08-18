import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import SubjectResources from './Components/SubjectResources/SubjectResources';
import SignIn from './Components/SignIn/SignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: null
    }
  }

  render () {
    return (
    <div className="App">
      <Router>
            <Switch>
              <Route path='/Home'>
                <Home/>
              </Route>
              <Route path='/SubjectResources'>
                <SubjectResources/>
              </Route>
              <Route path='/SignIn'>
                <SignIn/>
              </Route>    
            </Switch>
          </Router>
    </div>
    );
  }
}

export default App;
