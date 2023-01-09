import React, { Component } from 'react';
import { Button, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import VrTrailApi from '../api/VrTrailApi';

class UserDropdown extends Component {

    constructor(props) {
        super(props);
    
        // Init an empty state
        this.state = {
            user: null,
            currentUser: null,
            currentUserName: ' ',
            currentUserAge: null,
        };
    }
  
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Nutzerinformationen</Card.Title>
                    <Card.Text>
                        Name: {this.props.selectedUser.name} <br/>
                        Alter: {this.props.selectedUser.age}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
  }
  export default UserDropdown;