/* client/src/components/partials/Toggle.js */

import React from "react";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="toggle">
        <label className="switch">
          <input type="checkbox" checked={(this.props.active && this.props.active !== "" ? true : false)} onChange={() => {
            if (this.props.active) {
              this.props.activeAction();
            } else {
              this.props.inactiveAction();
            }
          }}/>
          <span className="slider round"></span>
        </label>
        <p>{(this.props.active ? this.props.activeState : this.props.inactiveState )}</p>
        { this.props.link && this.props.link !== "" ? (
          <a className="toggle__link" href={this.props.link} target="_blank">view</a>
        ) : ""}
      </div>
    )
  }
}

export default Toggle;
