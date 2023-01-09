import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Home from './components/Home';
import './style.css';


class App extends React.Component {


  	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			show: false,
		};
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

  render() {
    return (
      <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home" className="game-title">Duranki</Navbar.Brand>
          <Navbar.Text className="medicine-app">- Medizinapp</Navbar.Text>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Made by HOLA - Vr Trail Walking Group
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="content">

        <Home />

      </Container>
    </>
    );
  }
}

export default App;
