import React, { Component } from 'react';
import { Button, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import VrTrailApi from '../api/VrTrailApi';

class UserDropdown extends Component {

    constructor(props) {
        super(props);
        this.handleUserChange = this.handleUserChange.bind(this)
    
        // Init an empty state
        this.state = {
          user : [],
          open: false,
          currentUser: null,
          currentUserName: ' ',
          currentUserAge: null,
        };
    }

    handleUserChange(evt){
        this.props.handleUser(evt)
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    getUser = () => {
        console.log("Hi Test getUser")
        VrTrailApi.getAPI().getUser()
        .then(userModels =>
            this.setState({
                user: userModels,
                error: null,
                loadingInProgress: false,
            })).then(() => {
              if (this.state.user === null){
                this.setState({
                  test: true,
                })
                
              }
            })
            .catch(e =>
                this.setState({
                    user: [],
                    error: e,
                    loadingInProgress: false,
                }));
        this.setState({
            error: null,
            loadingInProgress: true,
            loadingVorschlaegeError: null
        });
}

    getUserByName = () => {
        console.log(this.state.currentUserName)
		VrTrailApi.getAPI().getUserByName(this.state.currentUserName)
			.then(user =>
				this.setState({
                    currentUser: user,
                    currentUserAge: user.age,
					error: null,
					loadingInProgress: false,
				})).catch(e =>
					this.setState({
                        currentUser: null,
                        currentUserAge: null,
						error: e,
						loadingInProgress: false,
					}));
			this.setState({
				error: null,
				loadingInProgress: true
			});
	};

    componentDidMount() {
		this.getUser()
    };
  
    render() {
        const { user }  = this.state;
        return (
        <div>
            <DropdownButton title="Nutzer auswählen" onSelect={this.handleUserChange} id="dropdown-button">
                {
                    user.map((item) => <Dropdown.Item type="button" key={item.getID()} eventKey={item.id}>{item.name}</Dropdown.Item>)
                }
            </DropdownButton>
        </div>
        );
    }
  }
  export default UserDropdown;