import React, { Component } from 'react';

class Measurement extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {
    return (
      <>
      <button onClick={() => {this.props.click(this.props.value)}}>{this.props.name}</button>
      </>
    )
  }
}
export default Measurement;