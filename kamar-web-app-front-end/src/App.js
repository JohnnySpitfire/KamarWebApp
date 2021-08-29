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
          credits: [[0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]],
          lastsubmittedassessment : [],
          creditGoals: [0, 0, 0, 0]
      }
    }
  }

  updateCreditGoals = (creditGoalsInput) =>{
      console.log('input', creditGoalsInput)
      this.setState({userNCEAProfile:{...this.state.userNCEAProfile, creditGoals: creditGoalsInput}})
      console.log(this.state.userNCEAProfile.creditGoals)
  }

  loadUser = (data) => {
    console.log(data)
    const { username, name, email, subjects, level } = data[0];
    const { credits, lastsubmittedassessment, creditgoals} = data[1];
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
                          nsn: data[1].nsn,
                          credits: credits,
                          creditGoals: creditgoals,
                          lastsubmittedassessment ,
                                  }, 
                  isSignedIn: true
  })
}
  render () {
    console.log('app state', this.state)
    return (
    <div className="App">
      <Router>
            <Switch>
              <Route path='/Home'>
              <Home fullName = {this.state.user.name} updateCreditGoals={this.updateCreditGoals} userNCEAProfile={this.state.userNCEAProfile} isSignedIn={this.state.isSignedIn}/>
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
  