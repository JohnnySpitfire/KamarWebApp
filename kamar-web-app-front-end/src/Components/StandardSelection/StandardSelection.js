import React from 'react'
import StandardResoucesResults from '../StandardResoucesResults/StandardResoucesResults';
import StandardsList from '../StandardsList/StandardsList';
import ResourceCardList from '../ResourceCardList/ResourceCardList';
import SearchBar from '../SearchBar/SearchBar';
import './standard-selection.css' 
import {
    Route,
  } from "react-router-dom";
  import {withRouter} from 'react-router-dom'

class StandardsSelection extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedStandardNumber: '000000',
            searchText: '',
            isSearching: false,
            subjectResourcesList: [],
            filteredSubjectList: []
        }   
    }

    setSelectedStandard = (standardNumber) =>{
        this.setState({selectedStandardNumber: standardNumber})
    }

    getSearchText = (searchText, isSearching) => {
        this.setState({ searchText });
        this.setState({ isSearching })
        const currentSubjectList = this.state.subjectResourcesList;
        const newResourceList = currentSubjectList.filter((subject) => {
            const titleLower = subject.title.toLowerCase()
            return titleLower.includes(searchText.toLowerCase())
        })
        if(isSearching){
            this.setState({filteredSubjectList: newResourceList})
        } else if (!isSearching){
            this.setState({filteredSubjectList: this.state.subjectList})
        } 
    }

    getResourcesBySubject = () => {
        fetch('http://localhost:3000/resourcesbysubject', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                subject: this.props.subjectName
            })
            
        }).then(res => res.json())
        .then(subjectResourcesList => {
            this.setState({ subjectResourcesList })
        })

    }
    componentDidMount(){
        this.getResourcesBySubject()
    }


    render(){
        console.log(this.state)
        return(
            <React.Fragment>
                    <h1>{this.props.subjectName.charAt(0).toUpperCase() + this.props.subjectName.slice(1)}</h1>
                        <div className='standard-selection-wrapper'>
                           <SearchBar getSearchText={this.getSearchText}/>
                        </div>
                    <Route exact path={`/SubjectResources/${this.props.userLevel}/${this.props.subjectName}`}>
                        {this.state.isSearching?
                        <ResourceCardList resourcesResponse={this.state.filteredSubjectList}/>
                        :<div className='standard-selection-wrapper'>
                            <h2>Search By Standard</h2>
                            <StandardsList setSelectedStandard={this.setSelectedStandard} standards={this.props.standards} userLevel={this.props.userLevel} subjectName={this.props.subjectName}/>
                        </div>}
                    </Route>
                    <Route path={`/SubjectResources/${this.props.userLevel}/${this.props.subjectName}/${this.state.selectedStandardNumber}`}>
                        <StandardResoucesResults standardNumber={this.state.selectedStandardNumber}/>
                    </Route>
            </React.Fragment>
        )
    }
}
export default withRouter(StandardsSelection)