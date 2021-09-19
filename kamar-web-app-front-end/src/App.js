import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import SubjectResources from './Components/SubjectResources/SubjectResources';
import SignIn from './Components/SignIn/SignIn';
import subjectList from './SubjectList'
import Contact from './Components/Contact/Contact'
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

  postSubjects = () => {
    fetch('http://localhost:3000/postsubjects', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(subjectList)
    })
  }

  loadUser = (data) => {
    console.log(data)
    const { username, name, email, subjects, level } = data[0];
    const { credits, lastsubmittedassessment, creditgoals} = data[1];
    this.setState({                 
                  isSignedIn: true,
                  user:{
                          id: data[0].id,
                          username,
                          name,
                          email,
                          nsn: data[0].nsn,
                          subjects,
                          level,
                       },
                  userNCEAProfile: { 
                          nsn: data[1].nsn,
                          credits: credits,
                          creditGoals: creditgoals,
                          lastsubmittedassessment ,
                          }
  })
}

clearState = () => {
  this.setState({
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
  })
}

signOut = () => {
    this.clearState();
}

  render () {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/Home'>
            <Home signOut={this.signOut} fullName = {this.state.user.name} updateCreditGoals={this.updateCreditGoals} userNCEAProfile={this.state.userNCEAProfile} isSignedIn={this.state.isSignedIn}/>
            </Route>
            <Route path='/SubjectResources'>
              <SubjectResources signOut={this.signOut} userSubjects={this.state.user.subjects} userLevel={this.state.user.level} isSignedIn={this.state.isSignedIn}/>
            </Route>
            <Route path='/SignIn'>
              <SignIn loadUser={this.loadUser}/>
            </Route>
            <Route path='/Contact'>
              <Contact username={this.state.user.username} signOut={this.signOut} isSignedIn={this.state.isSignedIn}/>
            </Route>    
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
  