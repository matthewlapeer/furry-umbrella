import React, { Component } from 'react';

class SaveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {name: undefined};
    this.updateName = this.updateName.bind(this);
    this.save = this.save.bind(this);
    console.log(this.props);
  }
  updateName(e) {
    const newState = {name: e.target.value};
    this.setState(newState)
  }
  save(e) {
    e.preventDefault();
    if (this.state.name) this.props.save(this.state.name);
  }
  render() {
    return (
      <>
      <h3>{this.props.value} {this.props.unit}</h3>
      <p>{this.state.name || '...'}</p>
      <form onSubmit={this.save}>
        <label htmlFor='nameInput'>{this.props.value} mm</label>
        <input id='nameInput' type='text' onChange={this.updateName}></input>
        <button type='submit'>Enter</button>
      </form>
      <button onClick={this.props.closeModal}>Cancel</button><button disabled={!this.state.name} onClick={this.save}>Save</button>
      </>
    )
  }
}
export default SaveModal;