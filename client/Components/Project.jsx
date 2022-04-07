import React, { Component } from 'react';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <>
        <h4>{this.props.name}</h4>
      </>
    );
  }
}
export default Project;