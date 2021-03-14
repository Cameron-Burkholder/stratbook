/* client/src/components/partials/Objectives.js */

import React from "react";

class Objectives extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      newObj: ""
    }
  }
  onChange(e) {
    this.setState({
      newObj: e.target.value
    });
  }
  render() {
    const objectives = this.props.objectives.map((obj, index) => {
      return (
        <li key={index}>
          <p>- {obj}</p>
          <button onClick={() => { this.props.removeObjective(index) }}>X</button>
        </li>
      )
    });
    return (
      <div className="objectives">
        <h3>Objectives: {this.props.scenes[this.props.sceneIndex].name}</h3>
        <input onChange={this.onChange} value={this.state.newObj} placeholder="New Objective"/>
        <button onClick={() => {
          this.props.addObjective(this.state.newObj);
          this.setState({
            newObj: ""
          });
        }}>Add</button>
        <ul>
          { objectives }
        </ul>
        <h3>Notes</h3>
        <textarea value={this.props.notes} onChange={this.props.updateNotes} rows={7}></textarea>
      </div>
    )
  }
}

export default Objectives;
