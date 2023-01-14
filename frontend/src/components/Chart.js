import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
class Chart extends Component {
    
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
          data: [
            {
              name: "Task 1",
              default_Zeit: 1000,
              tatsaeliche_Zeit: this.props.task1Duration,
              amt: 2400,
            },
            {
              name: "Task 2",
              default_Zeit: 1500,
              tatsaeliche_Zeit: this.props.task2Duration,
              amt: 2210,
            },
            {
              name: "Task 3",
              default_Zeit: 8000,
              tatsaeliche_Zeit: this.props.task3Duration,
              amt: 2290,
            }
          ],

            showRunDialog: false,

            loadingInProgress: false,
            error: null
        };
    }

    render(){
          return (
            <LineChart width={500} height={300} data={this.state.data}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="default_Zeit" stroke="#8884d8" />
              <Line type="monotone" dataKey="tatsaeliche_Zeit" stroke="orange" />
            </LineChart>
          );
        }
}

export default Chart;