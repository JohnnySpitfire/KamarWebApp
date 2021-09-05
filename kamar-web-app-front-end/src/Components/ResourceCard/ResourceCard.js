import React from 'react'
import { withRouter } from 'react-router';

const ResourceCard = (props) => {
    return(
        <div className='resource-card-wrapper'>
            <div className='title-wrapper'>
                <h2 className=''>{props.title}</h2>
            </div>
            <div className='standard-wrapper'>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.nzqa.govt.nz/ncea/assessment/view-detailed.do?standardNumber=${props.standardNumber}`}>{props.standardNumber}</a>
            </div>
            <div className='resource-wrapper'>
                <iframe className='resource-iframe' height='360' width='480' src={props.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    )
}

export default withRouter(ResourceCard) 