import React from "react";
import {
    Link,
  } from "react-router-dom";
import {withRouter} from "react-router-dom";

const StandardCard = (props) => {
    return(
        <div>
            <Link to={`${props.history.location.pathname}/${props.standardNumber}`}>
               <p onClick={() => props.setSelectedStandard(props.standardNumber)}>{props.title}</p>
            </Link>
        </div>
    )
}

export default withRouter(StandardCard)