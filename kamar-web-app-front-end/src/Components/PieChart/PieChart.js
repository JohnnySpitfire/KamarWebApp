import React from 'react';
import { Pie } from 'react-chartjs-2'

const PieChart = (props) =>{
    return(
        <div className={props.graphClassName + ' graph'}>
            <Pie data={props.data} options={{radius:'80%', 
                                            layout: {
                                                     padding:20
                                                    },
                                            plugins:{
                                                    title: {
                                                            display: true, 
                                                            text: props.graphTitle,
                                                            font: {
                                                                size: 25
                                                            }
                                                        }
                                                    }, 
                                            hoverOffset:20, 
                                            hoverBorderWidth: 3,
                                            maintainAspectRatio: true,
                                            responsive: true, 
                                            }}/>
        </div>
    )
}

export default PieChart;