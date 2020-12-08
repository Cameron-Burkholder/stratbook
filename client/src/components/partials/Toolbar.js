/* client/src/components/partials/Toolbar.js */

import React from "react";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="toolbar">
        <p>BARS</p>
        <h4 className="toolbar__map">{this.props.map}</h4>
        <h4 className="toolbar__strategy">{this.props.strategy}</h4>
        <button className="button toolbar__button">Save</button>
        <p>Drones</p>
        <p>Breaches</p>
      </div>
    )
  }
}

export default Toolbar;
