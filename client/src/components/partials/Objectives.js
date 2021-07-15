/* client/src/components/partials/Objectives.js */

import React from "react";

class Objectives extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      newObj: "",
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
          <div>
            <p>{obj}</p>
            { this.props.function === "Editor" ? (
              <button onClick={() => { this.props.removeObjective(index) }}>X</button>
            ) : ""}
          </div>
        </li>
      )
    });
    return (
      <div className="objectives">
        <h3>{this.props.function === "EDITOR" ? "Edit" : "View"} Scene: {this.props.scenes[this.props.sceneIndex].name}</h3>
        <h4>Objectives</h4>
        { this.props.function === "Editor" ? (
          <div className="objectives__container">
            <input className="objectives__input" onChange={this.onChange} value={this.state.newObj} placeholder="New Objective"/>
            <button onClick={() => {
              this.props.addObjective(this.state.newObj);
              this.setState({
                newObj: ""
              });
            }}>Add</button>
          </div>
        ) : ""}
        <ul>
          { objectives.length > 0 ? objectives : <li>None to show</li> }
        </ul>
        <h4>Notes</h4>
        { this.props.function === "Editor" ? (
          <textarea value={this.props.notes} onChange={this.props.updateNotes} rows={12}></textarea>
        ) : (
          <p>{this.props.notes ? this.props.notes : "No notes to show."}</p>
        )}
      </div>
    )
  }
}

export default Objectives;
