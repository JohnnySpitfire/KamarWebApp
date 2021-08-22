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
        isSignedIn: false,
        user: {
          id: '',
          username: '',
          name: '',
          email: '',
          nsn: '',
          subjects: [],
          level: 0,
        },
        userNCEAProfile: {
          nsn: '',
          totalcredits: 0,
          excellencecredits: 0,
          meritcredits: 0,
          achievedcredits: 0,
          notachievedcredits: 0,
          lastsubmittedassessment : [],
          excellencecreditsgoal: 0,
          meritcreditsgoal: 0,
          achievedcreditsgoal: 0
      }
    }
  }

  loadUser = (data) => {
    const { username, name, email, subjects, level } = data[0];
    const { totalcredits, excellencecredits, meritcredits, achievedcredits, notachievedcredits , lastsubmittedassessment , excellencecreditsgoal, meritcreditsgoal, achievedcreditsgoal } = data[1];
    this.setState({user:{
                          id: data[0].id,
                          username,
                          name,
                          email,
                          nsn: data[0].nsn,
                          subjects,
                          level,
                        },
                  userNCEAProfile:{ 
                                    id: data[1].id,
                                    nsn: data[1].nsn,
                                    totalcredits,
                                    excellencecredits,
                                    meritcredits,
                                    achievedcredits,
                                    notachievedcredits,
                                    lastsubmittedassessment ,
                                    excellencecreditsgoal,
                                    meritcreditsgoal,
                                    achievedcreditsgoal
                                  }, isSignedIn: true
  })
}
  render () {
    console.log('app state', this.state)
    return (
    <div className="App">
      <Router>
            <Switch>
              <Route path='/Home'>
                <Home userNCEAProfile={this.state.userNCEAProfile} isSignedIn={this.state.isSignedIn}/>
              </Route>
              <Route path='/SubjectResources'>
                <SubjectResources/>
              </Route>
              <Route path='/SignIn'>
                <SignIn loadUser={this.loadUser}/>
              </Route>    
            </Switch>
          </Router>
    </div>
    );
  }
}

export default App;
