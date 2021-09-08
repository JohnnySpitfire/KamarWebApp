import React from "react";
import {
    Link,
  } from "react-router-dom";
import {withRouter} from "react-router-dom";

const StandardCard = (props) => {
    return(
        <div className='standard-card'>
            <div className='standard-card-title'>
                <Link to={`${props.history.location.pathname}/${props.standardNumber}`}>
                    <p onClick={() => props.setSelectedStandard(props.standardNumber)}>{props.title}</p>
                </Link>
            </div>
            <div className='standard-card-number'>
                <a target='_blank' rel='noreferrer' href={`https://www.nzqa.govt.nz/ncea/assessment/view-detailed.do?standardNumber=${props.standardNumber}`}>
                    <p>AS{props.standardNumber}</p>
                </a>
            </div>
        </div>
    )
}

export default withRouter(StandardCard) 