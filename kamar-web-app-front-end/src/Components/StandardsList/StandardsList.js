import React from "react";
import LevelStandards from '../LevelStandards/LevelStandards'
import {withRouter} from 'react-router-dom'

const StandardsList = (propsParent) => {
    return (
     propsParent.standards.map((levelStandards, i) => {
        return (
            <div>
                <h1>Level {-i + 3}</h1>
                <LevelStandards setSelectedStandard={propsParent.setSelectedStandard} userLevel={propsParent.userLevel} subjectName={propsParent.subjectName} levelStandards={levelStandards}/>
            </div>
            )
         })
    )
}

export default withRouter(StandardsList)