import React from 'react';
import { Bar } from "react-chartjs-2";

const StackedBarChart = (props) => {
    return (
      <div className={props.graphClassName}>
        <Bar 
            data= {props.data}
            options={{
              plugins:{
                title: {
                        display: true, 
                        text: props.graphTitle,
                        font: {
                            size: 25
                        }
                    }
                },
              indexAxis: 'y',
              maintainAspectRatio: true,
              responsive: true, 
              scales: {
                x: {
                  stacked: false,
                },
                y: {
                  stacked: false
                }
              }
            }
        }
      />
      </div>
    )
}

export default StackedBarChart;