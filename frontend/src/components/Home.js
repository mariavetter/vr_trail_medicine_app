import '../App.css';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import UserDropdown from './UserDropdown';
import UserInformation from './UserInformation';
import '../style.css';
import VrTrailApi from '../api/VrTrailApi';
import UserModel from '../api/userModel';


class Home extends React.Component {


  	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);
        this.handleUserChange = this.handleUserChange.bind(this)

		// Init an empty state
		this.state = {
			show: false,
			showRunList: false,
			user: null,
      selectedUser: null,
      currentUser: null,
      newUser: null,
      newUserName: null,
      newUserAge: null,
		};
	}

  handleUserChange(newUser) {
    this.setState({selectedUser: newUser});
    this.getUserById(newUser)
  }

  handleClose = () => {
    this.setState({
      show: false
    });
  }    

  handleShow = () => {
    this.setState({
      show: true
    });
  }

  getUserById = (selectedUserId) => {
    console.log("user by id")
    VrTrailApi.getAPI().getUserById(selectedUserId)
        .then(user =>
            this.setState({
                currentUser: user,
                currentUserAge: user.age,
                error: null,
                loadingInProgress: false,
            })).then(() => {
              this.getRunByIdUser(this.state.selectedUser)
            }).catch(e =>
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

  getRunByIdUser = (selectedUserId) => {
    console.log("run by id")
    VrTrailApi.getAPI().getRunByIdUser(selectedUserId)
    .then(runModels =>
        this.setState({
            runs: runModels,
            error: null,
            loadingInProgress: false,
        }))
        .catch(e =>
            this.setState({
                runs: [],
                error: e,
                loadingInProgress: false,
            }));
    this.setState({
        error: null,
        loadingInProgress: true,
        loadingRunError: null
    });
}

    // API Anbindung um die Lerngruppe ihm Backend hinzuzufügen
    postUser = () => {
      console.log("Heee", this.state.newUserName, this.state.newUserAge)
      let newUser = new UserModel();
      newUser.setID(0)
      newUser.setName(this.state.newUserName)
      newUser.setAge(this.state.newUserAge)
      VrTrailApi.getAPI().postUser(newUser)
      .then(userBO =>
        // Backend call sucessfull
        // reinit the dialogs state for a new empty customer
        this.setState({
          newUser: userBO
        })).catch(e =>
        this.setState({
          updatingInProgress: false,    // disable loading indicator
          updatingError: e              // show error message
        })
      );
  
      // set loading to true
      this.setState({
        updatingInProgress: true,       // show loading indicator
        updatingError: null             // disable error message
      });
    }

    handleNewUserName(e) {
      this.setState({ newUserName: e.target.value })
    }

    handleNewUserAge(e) {
      this.setState({ newUserAge: e.target.value })
    }

  render() {
    return (
      <>
          <div className="d-flex flex-column mb-3">
            <div className="p-2">
              <div className="d-flex flex-row mb-3">
                <div className="p-2">
                  <UserDropdown handleUser={this.handleUserChange}></UserDropdown>
                </div>
                <div className="p-2">
                  <Button variant="success" className="button-style" id="create-user" onClick={this.handleShow}>Neuen Nutzer anlegen</Button>
                </div>
              </div>
            </div>
            {
            this.state.currentUser ?
            <div className="p-2">
              <UserInformation currentUser={this.state.currentUser} runs={this.state.runs}></UserInformation>
            </div>
            : null
            }

          </div>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Neuen Nutzer anlegen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter Name" onChange={e => this.handleNewUserName(e)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAlter">
                <Form.Label>Alter</Form.Label>
                <Form.Control type="alter" placeholder="Alter" onChange={e => this.handleNewUserAge(e)}/>
              </Form.Group>
              <Button variant="primary" type="submit" className="submit-button" onClick={this.postUser}>
                Nutzer anlegen
              </Button>
            </Form>
            </Modal.Body>
          </Modal>
    </>
    );
  }
}

export default Home;
