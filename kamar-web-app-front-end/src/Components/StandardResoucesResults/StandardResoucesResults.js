import React from 'react'
import ResourceCardList from '../ResourceCardList/ResourceCardList';
import './subject-resources-results.css' 
import { withRouter } from 'react-router-dom';

class StandardResoucesResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resourcesResponse: []
        }
    }

    getResourcesByStandard = () => {
        fetch('http://localhost:3000/resourcesbystandard', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                standardNumber: this.props.standardNumber
            })
            
        }).then(res => res.json())
        .then(resourceList => {
            this.setState({resourcesResponse: resourceList})
        })

    }

componentDidMount () {
    this.getResourcesByStandard()
}

render() {  
    return(
        <div className='resource-results-wrapper'>
            <ResourceCardList resourcesResponse={this.state.resourcesResponse}/>
        </div>
         )
    }
}

export default withRouter(StandardResoucesResults)