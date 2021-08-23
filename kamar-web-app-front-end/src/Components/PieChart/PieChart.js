import React from 'react';
import { Pie } from 'react-chartjs-2'

const PieChart = (props) =>{
    return(
        <div className={props.graphClassName + ' graph'}>
            <Pie data={props.data} options={{radius:'100%', hoverOffset:20, hoverBorderWidth: 3}}/>
        </div>
    )
}

export default PieChart;