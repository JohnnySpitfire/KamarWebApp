import React from "react";
import StandardCard from '../StandardCard/StandardCard';

  import {withRouter} from 'react-router-dom'

const LevelStandards = (propsParent) => {
        return(
        propsParent.levelStandards.map((props, i) => {
            return (
                <StandardCard setSelectedStandard={propsParent.setSelectedStandard} standardNumber={props[0]} title={props[1]}/>
            )
        })
    )
}

export default withRouter(LevelStandards)