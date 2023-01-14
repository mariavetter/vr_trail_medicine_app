import React, { Component } from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import RunListEntry from './RunListEntry';

class RunList extends Component {

    constructor(props) {
        super(props);
    
        // Init an empty state
        this.state = {
          currentUser: this.props.selectedUser,
          runsBuff: this.props.runs,
          counter: 0
        };
    }

    componentDidUpdate() {
        console.log("nothing")
    }

    render() {
        console.log("this.props.runs", this.props.runs)
        console.log("this.state.runsBuff", this.state.runsBuff)
        // console.log("length", this.props.runs.length)
        return (
            this.props.runs ?
                <div>
                    {
                        this.props.runs.map((item) => 
                            <Accordion id="accordion">
                                <Accordion.Item eventKey={item.id - 1}>
                                    <Accordion.Header>Durchlauf {item.id}</Accordion.Header>
                                        <RunListEntry key={this.props.runs.id} run={item} expandedState={this.props.runs.id}
                                        onExpandedStateChange={this.onExpandedStateChange}
                                        />
                                    </Accordion.Item>
                            </Accordion>
                        )
                    }
                </div>
            : null
        );
    }
  }
  export default RunList;