import React from 'react'
import StandardResoucesResults from '../StandardResoucesResults/StandardResoucesResults';
import StandardsList from '../StandardsList/StandardsList';
import './standard-selection.css' 
import {
    Route,
  } from "react-router-dom";
  import {withRouter} from 'react-router-dom'

class StandardsSelection extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedStandardNumber: '000000'
        }   
    }

    setSelectedStandard = (standardNumber) =>{
        this.setState({selectedStandardNumber: standardNumber})
    }

    render(){
        console.log('aaaaa', this.state)
        return(
            <React.Fragment>
                    <h1>{this.props.subjectName.charAt(0).toUpperCase() + this.props.subjectName.slice(1)}</h1>
                    <Route exact path={`/SubjectResources/${this.props.userLevel}/${this.props.subjectName}`}>
                        <div className='standard-selection-wrapper'>
                            <StandardsList setSelectedStandard={this.setSelectedStandard} standards={this.props.standards} userLevel={this.props.userLevel} subjectName={this.props.subjectName}/>
                        </div>
                    </Route>
                    <Route path={`/SubjectResources/${this.props.userLevel}/${this.props.subjectName}/${this.state.selectedStandardNumber}`}>
                        <StandardResoucesResults standardNumber={this.state.selectedStandardNumber}/>
                    </Route>
            </React.Fragment>
        )
    }
}
export default withRouter(StandardsSelection)