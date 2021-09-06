import React from 'react';
import SubjectCards from '../SubjectCards/SubjectCards';
import './subject-resources.css'
import SearchBar from '../SearchBar/SearchBar'
import Header from '../Header/Header';
import {
    Route,
  } from "react-router-dom";
import { withRouter } from 'react-router';
import StandardSelection from '../StandardSelection/StandardSelection';

  

class SubjectResources extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            subjectName: '',
            subjectList: [],
            subjectStandards: []
        }
    }

    setSubject = (subjectName) =>{
        this.setState({ subjectName})
        this.getStandards(subjectName)
    }
    
    getSubjectList = () =>{
        fetch('http://localhost:3000/subjectlist', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(subjectList => {
              this.setState({ subjectList });
        }).catch(err => console.log(err))
    }

    getStandards = (subjectName) =>{
        const arrayPos = -this.props.userLevel + 3
        fetch('http://localhost:3000/getstandards', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: subjectName
            })
        })
        .then(response => response.json())
        .then(subjectStandards => {
           const standardsArray = [subjectStandards.level3, subjectStandards.level2, subjectStandards.level1]
           console.log('arraystandards', standardsArray)
            if(this.props.userLevel === 0){
             this.setState({ subjectStandards: standardsArray})
         } else { 
             this.setState({ subjectStandards: [standardsArray[arrayPos]]})
         }

        }).catch(err => console.log(err))   
        if (this.state.subjectStandards === undefined){
            this.setState({subjectStandards: []})
        }
    }

    componentDidMount (){
        this.getSubjectList()
    } 
    
    render() {
        console.log('subjectresources', this.state)
        return (
            <React.Fragment>
                <Header/>
                <Route exact path="/SubjectResources">
                    <div className='main-container-resources'>
                        <SearchBar/>
                        <SubjectCards subjectList={this.state.subjectList} setSubject={this.setSubject} userSubjects={this.props.userSubjects} userLevel={this.props.userLevel}/>
                    </div>
                </Route>
                <Route path={`/SubjectResources/${this.props.userLevel}/${this.state.subjectName}`}>
                    <StandardSelection standards={this.state.subjectStandards} userLevel={this.props.userLevel} subjectName={this.state.subjectName}/>
                </Route>
            </React.Fragment>
        );
    }
}

export default withRouter(SubjectResources);