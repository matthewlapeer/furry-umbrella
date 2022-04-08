import React, { Component } from 'react';
import "regenerator-runtime/runtime";

import Measurement from './Measurement';
import SaveModal from './SaveModal';

class ProjectDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      measurements: [],
      modalState: {open: false},
      calculated: undefined
    };
    this.fetchMeasurements = this.fetchMeasurements.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() { 
    this.fetchMeasurements();
  }

  calculateNewMeasurement(e, state) {
    e.preventDefault();
    try {
      const input = Number(eval(e.target.children[1].value));
      if (input === input) {
        const newState = {...state}
        newState.calculated = Number(eval(input));
        newState.modalState = {open: true};
        this.setState(newState);
      }
    } catch (error) {
      e.target.children[1].value = '';
    }
  }

  closeModal() {
    this.setState({modalState: {open: false}});
  }

  async fetchMeasurements() {
    try {
      const response = await fetch('/measurements/' + this.props.id.id);
      if (!response.ok) throw new Error(response.status);
      this.setState({measurements: await response.json()});
    } catch (error) {
      console.log(error);
    }
  }

  measurementClick(value) {
    document.getElementById('calculationInput').value += value;
  }
  async save(name) {
    this.closeModal();
    console.log(name);
    const newMeasurement = {name: name, value: this.state.calculated, unit: 'mm'};
    const data = JSON.stringify(newMeasurement);
    await fetch('/measurements/' + this.props.id.id, {method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: data});
    this.fetchMeasurements();
  }

  validateKeypress(e) {
    const input = e.target;
    const allowed = new Set(['0','1','2','3','4','5','6','7','8','9','+','-','/','*','(',')',' ','.']);
    console.log(!allowed.has(e.key))
    if (!allowed.has(e.key)) {
      e.preventDefault()
    }
  }

  render() {
    let measurements = [];
    console.log(this.props)
    for (let i = 0; i < this.state.measurements.length; i++) {
      let m = this.state.measurements[i];
      measurements.push(<Measurement name={m.name} value={m.value} id={m._id} key={m._id} click={this.measurementClick}/>);
    }
    
    return (
      <>
      <h2 className="measurements">{this.props.id.name}</h2>
      <h4 className="measurements">Saved Measurements</h4>
      <div className="measurementsContainer" >
      <div className="measurements">
        {measurements}
      </div>
      <form onSubmit={(e) => {this.calculateNewMeasurement(e, this.state)}}>
        <label htmlFor='calculationInput'>Calculate new measurement: </label>
        <input id='calculationInput' type='text' onKeyPress={this.validateKeypress}></input>
        <button type='submit'>Calculate</button>
      </form>
        <div className="modal">
        {this.state.modalState.open &&
          <SaveModal
            value={this.state.calculated}
            closeModal={this.closeModal}
            save={this.save}
          />
        }
        </div>
      </div>
      </>
    )
  }
}
export default ProjectDisplay;