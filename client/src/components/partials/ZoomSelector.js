/* client/src/components/partials/ZoomSelector.js */

import React from "react";

class ZoomSelector extends React.Component {
  render() {
    return (
      <div className="zoom-selector">
        <p>Zoom Level: {this.props.zoom}X</p>
        <input onChange={this.props.onChange} value={this.props.zoom} type="range" min="1" max="3" step="0.1"/>
      </div>
    )
  }
}

export default ZoomSelector;
