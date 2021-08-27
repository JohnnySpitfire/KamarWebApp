import React from 'react';
import { Bar } from "react-chartjs-2";

const StackedBarChart = (props) => {
    console.log(props.data);
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