import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import VrTrailApi from '../api/VrTrailApi';
import Chart from './Chart';
import { Spinner } from 'loading-animations-react';

class RunListEntry extends Component {
    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            run: props.run,
            runID: props.run.getID(),
            runDate: props.run.getDate(),
            test: props.task1,

            task1: null,
            task1Duration: null,

            task2: null,
            task2Duration: null,
            task2WrongTiles: null,
            task2DurationTiletoTile: null,

            task3: null,
            task3Duration: null,
            task3WrongAssignment: null,

            loadingInProgress: false,
            error: null
        };
    }

      getTask1ById = () => {
        VrTrailApi.getAPI().getTask1ById(this.state.runID)
        .then(taskBO =>
            this.setState({
                task1: taskBO,
                task1Duration: taskBO.duration,
                error: null,
                loadingInProgress: false,
            })).catch(e =>
                this.setState({
                  task1: null,
                    error: e,
                    loadingInProgress: false,
                }));
        this.setState({
            error: null,
            loadingInProgress: true,
            loadingKonversationenError: null
        });
      }

      getTask2ById = () => {
        VrTrailApi.getAPI().getTask2ById(this.state.runID)
        .then(taskBO =>
            this.setState({
                task2: taskBO,
                task2Duration: taskBO.duration,
                task2WrongTiles: taskBO.wrongtiles,
                task2DurationTiletoTile: taskBO.durationTiletoTile, 
                error: null,
                loadingInProgress: false,
            })).catch(e =>
                this.setState({
                  task2: null,
                    error: e,
                    loadingInProgress: false,
                }));
        this.setState({
            error: null,
            loadingInProgress: true,
            loadingKonversationenError: null
        });
      }

      getTask3ById = () => {
        VrTrailApi.getAPI().getTask3ById(this.state.runID)
        .then(taskBO =>
            this.setState({
                task3: taskBO,
                task3Duration: taskBO.duration,
                task3WrongAssignment: taskBO.wrongAssignment,
                error: null,
                loadingInProgress: false,
            })).catch(e =>
                this.setState({
                  task3: null,
                    error: e,
                    loadingInProgress: false,
                }));
        this.setState({
            error: null,
            loadingInProgress: true,
            loadingKonversationenError: null
        });
      }

    componentDidMount() {
        // load Profil
        this.getTask1ById();
        this.getTask2ById();
        this.getTask3ById();
    }

    render(){
          const { runDate, task1Duration, task2Duration, task2WrongTiles, task2DurationTiletoTile, task3Duration, task3WrongAssignment } = this.state;
          return (
            <div>
                <Accordion.Body>
                      Datum: {runDate}
                      <br/><br/><br/>
                      {
                            task1Duration != null && task2Duration != null && task3Duration != null?
                            <Chart task1Duration={task1Duration} task2Duration={task2Duration} task3Duration={task3Duration}></Chart>
                            : <Spinner color1="orange" color2="#fff" textColor="rgba(0,0,0, 0.5)" id="spinner"/>
                      }
                      <br/><br/><br/>
                      <Card>
                        <Card.Body>
                          <Card.Subtitle>Einstiegsslevel (Task 1)</Card.Subtitle>
                          {
                            task1Duration != null ?
                            <Card.Text>
                              Dauer: {task1Duration} Minuten
                            </Card.Text>
                            : <Spinner color1="orange" color2="#fff" textColor="rgba(0,0,0, 0.5)" id="spinner"/>
                          }
                        </Card.Body>
                      </Card>
                      <br/>
                      <Card>
                        <Card.Body>
                          <Card.Subtitle>Task 2</Card.Subtitle>
                          {
                            task2Duration != null ?
                            <Card.Text>
                              Dauer: {task2Duration} Minuten <br/>
                              Falsche Fliesen: {task2WrongTiles} <br/>
                              Dauer von Fliese zu Fliese: {task2DurationTiletoTile}
                            </Card.Text>
                            : <Spinner color1="orange" color2="#fff" textColor="rgba(0,0,0, 0.5)" id="spinner"/>
                          }
                        </Card.Body>
                      </Card>
                      <br/>
                      <Card>
                        <Card.Body>
                          <Card.Subtitle>Task 3</Card.Subtitle>
                          {
                            task3Duration != null ?
                            <Card.Text>
                              Dauer: {task3Duration} Minuten <br/>
                              Falsche Zuordnung: {task3WrongAssignment}
                            </Card.Text>
                            : <Spinner color1="orange" color2="#fff" textColor="rgba(0,0,0, 0.5)" id="spinner"/>
                          }
                        </Card.Body>
                      </Card>
                </Accordion.Body>
            </div>
          );
        }
}

export default RunListEntry;