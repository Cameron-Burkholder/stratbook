/* client/src/components/partials/Objectives.js */

import React from "react";

class ViewerObjectives extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const objectives = this.props.objectives.map((obj, index) => {
      return (
        <li key={index}>
          <p>- {obj}</p>
        </li>
      )
    });
    return (
      <div className="objectives">
        <h3>Objectives</h3>
        <ul>
          { objectives }
        </ul>
        <h3>Notes</h3>
        <p>{this.props.notes}</p>
      </div>
    )
  }
}

export default ViewerObjectives;
