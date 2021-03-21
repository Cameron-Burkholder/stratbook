/* client/src/components/partials/Objectives.js */

import React from "react";

class ViewerObjectives extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newObj: "",
    }
  }
  render() {
    const objectives = this.props.objectives.map((obj, index) => {
      return (
        <li key={index}>
          <div>
            <p>{obj}</p>
          </div>
        </li>
      )
    });
    return (
      <div className="objectives">
        <h3>Objectives: {this.props.scenes[this.props.sceneIndex].name}</h3>
        <ul>
          { objectives }
        </ul>
        <h3>Notes: {this.props.scenes[this.props.sceneIndex].name}</h3>
        <p>{this.props.notes}</p>
        <h3>Video Link</h3>
        <a className="objectives__video" href={this.props.video} rel="noopener noreferrer" target="_blank">Watch Video</a>
      </div>
    )
  }
}

export default ViewerObjectives;
