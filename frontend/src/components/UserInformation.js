import '../App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import RunList from './RunList';
import UserProfil from './UserProfil';
import '../style.css';
import VrTrailApi from '../api/VrTrailApi';
import RunModel from '../api/runModel';
import { ArrowClockwise } from 'react-bootstrap-icons';

class Home extends React.Component {


  	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			show: false,
			showRunList: false,
			user: this.props.currentUser,
      newRunBuff: null
		};
	}

// API Anbindung um die Lerngruppe ihm Backend hinzuzufügen
postRun = () => {
  console.log("postrun")
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '.' + mm + '.' + yyyy;
  
  console.log("today", today)
  console.log("this.state.currentUser.id", this.props.currentUser.id)
  let newRun = new RunModel();
  newRun.setID(0)
  newRun.setDate(today)
  newRun.setUserId(this.props.currentUser.id)
  VrTrailApi.getAPI().postRun(newRun)
  .then(runBO =>
    // Backend call sucessfull
    // reinit the dialogs state for a new empty customer
    VrTrailApi.getAPI().sendRunToUnity(runBO))
    .then(() => {
      console.log("we are here")
    }).catch(e =>
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


refreshPage() {
  window.location.reload(false);
}

  render() {
    console.log("this.state.user", this.state.user)
    return (
        <div className="d-flex flex-column mb-3">

          <div className="p-2">
              <UserProfil selectedUser={this.props.currentUser}></UserProfil>
          </div>

          <div className="p-2">
            <Button id="refresh-button">
              <ArrowClockwise color="orange" onClick={this.refreshPage}/>
              </Button>
            <Button id="run-button" onClick={this.postRun}>Neuen Durchlauf starten</Button>
          </div>

          <div className="p-2">
              <RunList selectedUser={this.props.currentUser} runs={this.props.runs}></RunList>
          </div>

        </div>
    );
  }
}

export default Home;
