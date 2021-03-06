import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "regenerator-runtime/runtime";

import Project from './Project';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: []};
    this.fetchProjects = this.fetchProjects.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
  }
  componentDidMount() {
    this.fetchProjects();
  }

  async getProjectName(e){
    try {
      e.preventDefault();
      const projectName = e.target.children[1].value;
      const update = await fetch(`/projects/${projectName}`, {method: 'post'});
      if (!update.ok) throw new Error(update.status);
      this.fetchProjects();
    } catch (error) {
      console.log(error);
    }
  }

  async fetchProjects() {
    try {
      const response = await fetch('/projects');
      if (!response.ok) throw new Error(response.status);
      this.setState({projects: await response.json()});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let projects = [];
    for (let i = 0; i < this.state.projects.length; i++) {
      const p = this.state.projects[i];
      projects.push(
        <div className="projectTile" key={'project' + p._id}>
          <span className="delete">X</span>
          <Link to="/projects/display" state={{id: p._id, name: p.name} } >
              <Project name={p.name} id={p._id} />
          </Link>
        </div>
      
      );
    }
    return (
      <div className="projectsContainer">
        <div className="projectHeader">
        <h2>Projects</h2>
        <form onSubmit={this.getProjectName}>
          <label htmlFor='projectNameInput'>Name:</label>
          <input id='projectNameInput' type='text'></input>
          <button type='submit'>Add Project</button>
        </form>
        </div>
        <div className="gradientLine"></div>
        <div className="projectsWrapper">
          {projects}
        </div>
      {/* <h2>Ideas</h2>
      <h2>Inspiration</h2> */}
      </div>
    );
  }
}
export default MainContainer;