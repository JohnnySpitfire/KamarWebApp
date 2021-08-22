import React from 'react';
import { Bar } from "react-chartjs-2";

const StackedBarChart = (props) => {
    console.log(props.data);
    return (
      <div className='graph'>
        <Bar 
            data= {props.data}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Credits Goal'
                },
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true
                }
              }
            }
        }
      />
      </div>
    )
}

export default StackedBarChart;