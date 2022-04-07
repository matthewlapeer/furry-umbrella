import React, { Component } from 'react';

class ProjectDisplay extends Component {
  constructor(props) {
    super(props);
    const { id } = props.id;
    console.log('id:', id);
  }

  componentDidMount() { 
  }

  render() {
    return (
      <>
      <h2>{this.props.name}</h2>
      <h4>Measurements</h4>
      {/* {Measurements} */}
      <form onSubmit={this.calculateNewMeasurement}>
        <label htmlFor='calculationInput'>Calculate new measurement:</label>
        <input id='calculationInput' type='text'></input>
        <button type='submit'>Calculate</button>
      </form>
      </>
    )
  }
}
export default ProjectDisplay;