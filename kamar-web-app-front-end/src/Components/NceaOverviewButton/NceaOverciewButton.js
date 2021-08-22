import React from 'react'

const NceaOverviewButton = (props) => {
    return(
        <React.Fragment>
            <button className='ncea-overview-button'>{props.text}</button>
        </React.Fragment>
    )
}

export default NceaOverviewButton;